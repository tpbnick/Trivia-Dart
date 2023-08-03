/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, ChangeEvent } from "react";
import About from "./About";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "./SupaBase";

const Trivia = () => {
	const TriviaSource: Record<string, string> = {
		"Open Trivia DB": "https://opentdb.com/api.php?amount=1",
		"The Trivia API": "https://the-trivia-api.com/api/questions?limit=1",
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
		"History & Holidays": "history_and_holidays",
		Language: "language",
		"Math & Geometry": "math_and_geometry",
		Mathematics: "mathematics",
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

	const handleSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedSource(event.target.value);
		setSelectedCategory("Any");
		setShowAnswer(false);
		setShowOptions(false);
	};

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategory(event.target.value);
		setShowAnswer(false);
		setShowOptions(false);
	};

	const decodeHTML = (html: string) => {
		const txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	};

	const shuffleArray = (array: string[]) => {
		// Randomize the possible answers
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const addQuestionMarkToEnd = (text: string) => {
		// Check if the text already ends with a question mark
		text = text.trimEnd();

		if (text.endsWith("?")) {
			return text;
		}

		// If the text ends with other punctuation, remove it and add a question mark
		const lastChar = text.charAt(text.length - 1);
		if (/[.,!]/.test(lastChar)) {
			return text.slice(0, -1) + "?";
		}

		// If no punctuation is found at the end, simply add a question mark
		return text + "?";
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
					.from("questions")
					.select("question, answer, incorrect_answers, category"); // Include the 'category' field

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
							? triviaData.incorrect_answers.map((answer: string) =>
									decodeHTML(answer)
							  )
							: []),
					];
					setOptions(shuffleArray(allAnswers));
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
					const allAnswers = [
						decodeHTML(data.results[0].correct_answer),
						...data.results[0].incorrect_answers.map((answer: string) =>
							decodeHTML(answer)
						),
					];
					setOptions(shuffleArray(allAnswers));
					setQuestion(decodeHTML(data.results[0].question));
					setAnswer(decodeHTML(data.results[0].correct_answer));
					setQuestionType(data.results[0].type);
				} else if (selectedSource === "TriviaDart") {
					// TriviaDart code was already handled above, so no need to repeat here
				} else {
					const allAnswers = [
						decodeHTML(data[0].correctAnswer),
						...data[0].incorrectAnswers.map((answer: string) => decodeHTML(answer)),
					];
					setOptions(shuffleArray(allAnswers));
					setQuestion(decodeHTML(data[0].question));
					setAnswer(decodeHTML(data[0].correctAnswer));
					setQuestionType(null);
				}
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.toString());
			} else {
				setError("An unknown error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="my-1 flex flex-col items-center pt-10 font-roboto">
			<div className="pt-3 pb-5 text-5xl font-roboto-mono">Trivia🎯</div>
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

			<button
				onClick={handleButtonClick}
				className="btn mt-4 py-4 btn-outline text-white font-bold px-4 rounded mx-auto"
			>
				Get Question
			</button>

			{loading && (
				<div className="flex justify-center items-center pt-4">
					<div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
				</div>
			)}
			{error && <p className="text-center">Error: {error}</p>}
			{question && (
				<div className="mt-4 text-center">
					{questionType === "boolean" && <p>True or False:</p>}
					<p className="text-white w-80 mx-auto text-xl">{question}</p>
					<button
						onClick={() => setShowOptions((prevShowOptions) => !prevShowOptions)}
						className={`btn mt-4 text-white font-bold py-2 px-4 rounded mx-auto ${
							questionType === "boolean" || options.length < 4
								? "cursor-not-allowed opacity-90 hover:"
								: "btn-outline"
						}`}
						disabled={questionType === "boolean" || options.length < 4}
					>
						{showOptions ? "Hide Options" : "Show Options"}
					</button>

					{showOptions && (
						<div className="py-5">
							{options.map((option, index) => (
								<p key={index} className="text-white">
									{option}
								</p>
							))}
						</div>
					)}
					<div className="py-5">
						<button
							onClick={() => setShowAnswer(true)}
							className="btn btn-outline btn-success text-white font-bold py-2 px-4 rounded mx-auto"
						>
							Show Answer
						</button>
					</div>
					{showAnswer && <p className="text-white text-xl">{answer}</p>}
				</div>
			)}
			<About />
			<div className="fixed bottom-0 right-0 p-5">
				<label htmlFor="about-modal">
					<FontAwesomeIcon
						icon={faGears}
						className="text-4xl hover:text-green-300 transition-all duration-200 transform hover:scale-110"
					/>
				</label>
			</div>
		</div>
	);
};

export default Trivia;
