import React, { useState, useEffect, ChangeEvent } from "react";

const Trivia = () => {
	const TriviaSource: Record<string, string> = {
		"Open Trivia DB": "https://opentdb.com/api.php?amount=1",
		"The Trivia API": "https://the-trivia-api.com/api/questions?limit=1",
	};

	const openTriviaURL = "&category=";
	const triviaAPIURL = "&categories=";

	const triviaDBCategories = {
		Any: "",
		Music: "music",
		"Sports & Leisure": "sport_and_leisure",
		"Film & TV": "film_and_tv",
		"Art & Literature": "arts_and_literature",
		History: "history",
		"Society & Culture": "society_and_culture",
		Science: "science",
		Geography: "geography",
		"Food & Drink": "food_and_drink",
		"General Knowledge": "general_knowledge",
	};
	const openTriviaCategories = {
		Any: "",
		"General Knowledge": 9,
		Books: 10,
		Film: 11,
		Music: 12,
		Television: 14,
		"Video Games": 15,
		"Science & Nature": 17,
		Technology: 18,
		Mythology: 20,
		Sports: 21,
		Geography: 22,
		History: 23,
		Politics: 24,
	};

	const [selectedSource, setSelectedSource] = useState<string>(
		Object.keys(TriviaSource)[0]
	);
	const [selectedCategory, setSelectedCategory] = useState<string>("any");
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
		setSelectedCategory("any");
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
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const handleButtonClick = async () => {
		setLoading(true);
		setShowAnswer(false);
		setShowOptions(false);
		setError(null);
		setQuestion(null);

		let triviaURL = TriviaSource[selectedSource];
		if (selectedCategory !== "any") {
			if (selectedSource === "Open Trivia DB") {
				triviaURL +=
					openTriviaURL + (openTriviaCategories as any)[selectedCategory];
			} else {
				triviaURL += triviaAPIURL + (triviaDBCategories as any)[selectedCategory];
			}
		}

		try {
			const response = await fetch(triviaURL);
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
		} catch (error: any) {
			setError(error.toString());
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleButtonClick();
	}, [selectedSource, selectedCategory]);

	return (
		<div className="my-4 flex flex-col items-center pt-10">
			<div className="pt-5 pb-10 text-5xl">Trivia 🎯</div>
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
				<div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
			)}
			{error && <p className="text-center">Error: {error}</p>}
			{question && (
				<div className="mt-4 text-center">
					{questionType === "boolean" && <p>True or False:</p>}
					<p className="text-white w-80 mx-auto">{question}</p>
					<button
						onClick={() => questionType !== "boolean" && setShowOptions(true)}
						className={`btn mt-4 text-white font-bold py-2 px-4 rounded mx-auto ${
							questionType === "boolean"
								? "opacity-90 cursor-not-allowed"
								: "btn-outline"
						}`}
						disabled={questionType === "boolean"}
					>
						Show Options
					</button>

					<div className="py-5">
						{showOptions &&
							options.map((option, index) => (
								<p key={index} className="text-white">
									{option}
								</p>
							))}
					</div>
					<div className="py-5">
						<button
							onClick={() => setShowAnswer(true)}
							className="btn mt-4 btn-outline btn-success text-white font-bold py-2 px-4 rounded mx-auto"
						>
							Show Answer
						</button>
					</div>
					{showAnswer && <p className="text-white">{answer}</p>}
				</div>
			)}
		</div>
	);
};

export default Trivia;
