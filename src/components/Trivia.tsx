import { useState, ChangeEvent } from "react";
import About from "./About";
import Settings from "./Settings";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleQuestion,
	faGears,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "./SupaBase";

const Trivia = () => {
	const TriviaSource: Record<string, string> = {
		"The Trivia API": "https://the-trivia-api.com/api/questions?limit=1",
		"Open Trivia DB": "https://opentdb.com/api.php?amount=1",
		TriviaDart: "",
	};

	const openTriviaURL = "&category=";
	const triviaAPIURL = "&categories=";
	const triviaDartURL = "&category=";

	const triviaDBCategories: Record<string, string> = {
		Any: "",
		"Art & Literature": "arts_and_literature",
		"Film & TV": "film_and_tv",
		"Food & Drink": "food_and_drink",
		"General Knowledge": "general_knowledge",
		Geography: "geography",
		History: "history",
		Music: "music",
		Science: "science",
		"Society & Culture": "society_and_culture",
		"Sports & Leisure": "sport_and_leisure",
	};
	const openTriviaCategories: Record<string, number> = {
		Any: 0,
		Books: 10,
		Film: 11,
		"General Knowledge": 9,
		Geography: 22,
		History: 23,
		Music: 12,
		Mythology: 20,
		Politics: 24,
		"Science & Nature": 17,
		Sports: 21,
		Technology: 18,
		Television: 14,
		"Video Games": 15,
	};

	const triviaDartCategories: Record<string, string> = {
		Any: "",
		"Art & Literature": "art_and_literature",
		Entertainment: "entertainment",
		"Food & Drink": "food_and_drink",
		General: "general",
		Geography: "geography",
		Language: "language",
		Music: "music",
		"People & Places": "people_and_places",
		"Religion & Mythology": "religion_and_mythology",
		"Science & Nature": "science_and_nature",
		"Sports & Leisure": "sports_and_leisure",
		"Tech & Video Games": "tech_and_video_games",
		"Toys & Games": "toys_and_games",
	};

	const [selectedSource, setSelectedSource] = useState<string>(
		Object.keys(TriviaSource)[0]
	);
	const [selectedCategory, setSelectedCategory] = useState<string>("Any");
	const [question, setQuestion] = useState<string | null>(null);
	const [answer, setAnswer] = useState<string | null>(null);
	const [questionType, setQuestionType] = useState<string | null>(null);
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const [options, setOptions] = useState<string[]>([]);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showAlert, setShowAlert] = useState(true);

	const handleSourceChange = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		setSelectedSource(value);
		setSelectedCategory("Any");
		setShowAnswer(false);
		setShowOptions(false);
	};

	const handleCategoryChange = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(value);
		setShowAnswer(false);
		setShowOptions(false);
	};

	const decodeHTML = (html: string) => {
		const txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	};

	const shuffleAnswers = (array: string[]) => {
		return array.sort(() => Math.random() - 0.5);
	};

	const addQuestionMarkToEnd = (text: string) => {
		// Check if the text already ends with a question mark
		text = text.trim();
		if (text.endsWith("?")) {
			return text;
		}
		// If the text ends with other punctuation, remove it and add a question mark
		const lastChar = text.charAt(text.length - 1);
		if (/[.,!]/.test(lastChar)) {
			return text.slice(0, -1) + "?";
		}
		// If no punctuation is found at the end, add a question mark
		return text.trimEnd() + "?";
	};

	const handleButtonClick = async () => {
		setLoading(true);
		setShowAnswer(false);
		setShowOptions(false);
		setError(null);
		setQuestion(null);

		let triviaURL = TriviaSource[selectedSource];
		if (selectedCategory !== "Any") {
			if (selectedSource === "Open Trivia DB") {
				triviaURL += openTriviaURL + openTriviaCategories[selectedCategory];
			} else if (selectedSource === "TriviaDart") {
				triviaURL += triviaDartURL + triviaDartCategories[selectedCategory];
			} else {
				triviaURL += triviaAPIURL + triviaDBCategories[selectedCategory];
			}
		}

		try {
			setLoading(true);
			setShowAnswer(false);
			setShowOptions(false);
			setError(null);
			setQuestion(null);

			if (selectedSource === "TriviaDart") {
				const { data, error } = await supabase
					.from("questionsv2")
					.select("question, answer, incorrect_answers, category");

				if (error) {
					throw new Error("Error fetching data from SupaBase");
				}

				const filteredData = data.filter(
					(item) =>
						selectedCategory === "Any" ||
						item.category === triviaDartCategories[selectedCategory]
				);

				if (filteredData.length > 0) {
					const randomIndex = Math.floor(Math.random() * filteredData.length);
					const triviaData = filteredData[randomIndex];

					const allAnswers = [
						decodeHTML(triviaData.answer),
						...(triviaData.incorrect_answers
							? triviaData.incorrect_answers.map(
									(answer: string) => decodeHTML(answer)
									// not sure why eslint is complaining here lol
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  )
							: []),
					];
					setOptions(shuffleAnswers(allAnswers));
					setQuestion(addQuestionMarkToEnd(decodeHTML(triviaData.question)));
					setAnswer(decodeHTML(triviaData.answer));
					setQuestionType(null);
				} else {
					setQuestion("No questions found for this category.");
				}
			} else {
				const headers: Record<string, string> = {};
				if (selectedSource === "TriviaDart") {
					headers["x-api-key"] = import.meta.env.VITE_TRIVIA_DART_APIKEY;
				}

				const response = await fetch(triviaURL, { headers });
				const data = await response.json();
				if (selectedSource === "Open Trivia DB") {
					if (data.response_code === 5) {
						toast.error("Rate limited from Open Trivia DB");
						setLoading(false);
						return;
					}
					const allAnswers = [
						decodeHTML(data.results[0].correct_answer),
						...data.results[0].incorrect_answers.map((answer: string) =>
							decodeHTML(answer)
						),
					];
					setOptions(shuffleAnswers(allAnswers));
					setQuestion(decodeHTML(data.results[0].question));
					setAnswer(decodeHTML(data.results[0].correct_answer));
					setQuestionType(data.results[0].type);
				} else {
					const allAnswers = [
						decodeHTML(data[0].correctAnswer),
						...data[0].incorrectAnswers.map((answer: string) => decodeHTML(answer)),
					];
					setOptions(shuffleAnswers(allAnswers));
					setQuestion(decodeHTML(data[0].question));
					setAnswer(decodeHTML(data[0].correctAnswer));
					setQuestionType(null);
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.toString());
				toast.error("Error loading question, try again.");
				console.log(`ERROR LOADING QUESTION\n${error}`);
			} else {
				setError("An unknown error occurred.");
				toast.error("An unknown error occurred, try again.");
				console.log(`UNKNOWN ERROR\n${error}`);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="my-1 flex flex-col items-center pt-10">
			<div className="pt-3 pb-5 text-5xl font-mono">Trivia🎯</div>
			<div className="flex py-4">
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Source</span>
					</label>
					<select
						value={selectedSource}
						onChange={handleSourceChange}
						className="select select-bordered w-full max-w-lg"
					>
						{Object.keys(TriviaSource).map((source, i) => (
							<option key={i} value={source}>
								{source}
							</option>
						))}
					</select>
				</div>

				<div className="form-control w-full max-w-xs ml-4">
					<label className="label">
						<span className="label-text">Category</span>
					</label>
					<select
						value={selectedCategory}
						onChange={handleCategoryChange}
						className="select select-bordered w-full max-w-lg"
					>
						{Object.keys(
							selectedSource === "Open Trivia DB"
								? openTriviaCategories
								: selectedSource === "TriviaDart"
								? triviaDartCategories
								: triviaDBCategories
						).map((category, i) => (
							<option key={i} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
			</div>

			{selectedSource === "Open Trivia DB" && showAlert && (
				<div
					role="alert"
					className="alert max-w-lg flex justify-between items-center"
				>
					<div className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span className="ml-2">
							Open TriviaDB is limited to 1 question every 5 seconds.
						</span>
					</div>
					<button onClick={() => setShowAlert(false)} className="ml-2">
						<FontAwesomeIcon icon={faTimes} className="text-xl" />
					</button>
				</div>
			)}

			<button
				onClick={handleButtonClick}
				className="btn btn-primary mt-4 py-4 text font-bold px-4 rounded mx-auto"
			>
				Get Question
			</button>

			{loading && (
				<div className="flex justify-center items-center pt-4">
					<div className="w-12 h-12 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
				</div>
			)}
			{error && (
				<p className="text-center pt-10">
					Error loading question, try again or check console for more details.
				</p>
			)}
			{question && (
				<div className="mt-4 text-center">
					{questionType === "boolean" && <p>True or False:</p>}
					<p className="text w-80 mx-auto text-xl">{question}</p>
					{questionType === "boolean" ? (
						<div className="tooltip" data-tip="Options are True/False">
							<button
								onClick={() => setShowOptions((prevShowOptions) => !prevShowOptions)}
								className={`btn btn-secondary mt-4 text-white font-bold py-2 px-4 rounded mx-auto ${
									questionType === "boolean" || options.length < 4
										? "cursor-not-allowed opacity-90 hover:"
										: "btn"
								}`}
								disabled={questionType === "boolean" || options.length < 4}
							>
								{showOptions ? "Hide Options" : "Show Options"}
							</button>
						</div>
					) : (
						<button
							onClick={() => setShowOptions((prevShowOptions) => !prevShowOptions)}
							className={`btn btn-secondary mt-4 text-white font-bold py-2 px-4 rounded mx-auto ${
								questionType === "boolean" || options.length < 4
									? "cursor-not-allowed opacity-90 hover:"
									: "btn"
							}`}
							disabled={questionType === "boolean" || options.length < 4}
						>
							{showOptions ? "Hide Options" : "Show Options"}
						</button>
					)}

					{showOptions && (
						<div className="py-5">
							{options.map((option, index) => (
								<p key={index} className="text">
									{option}
								</p>
							))}
						</div>
					)}
					<div className="py-5">
						<button
							onClick={() => setShowAnswer(true)}
							className="btn btn-accent text font-bold py-2 px-4 rounded mx-auto"
						>
							Show Answer
						</button>
					</div>
					{showAnswer && <p className="text text-xl">{answer}</p>}
				</div>
			)}
			<About />
			<Settings />
			<div className="fixed bottom-0 right-0 p-5">
				<label htmlFor="about-modal">
					<FontAwesomeIcon
						icon={faCircleQuestion}
						className="text-4xl hover:text-primary transition-all duration-200 transform hover:scale-110"
					/>
				</label>
			</div>
			<div className="fixed bottom-0 right-12 p-5">
				<label htmlFor="settings-modal">
					<FontAwesomeIcon
						icon={faGears}
						className="text-4xl hover:text-primary transition-all duration-200 transform hover:scale-110"
					/>
				</label>
			</div>
			<div>
				<Toaster />
			</div>
		</div>
	);
};

export default Trivia;
