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
import { TriviaState, TriviaResponse } from "../types/trivia";
import {
	TRIVIA_SOURCES,
	TRIVIA_DB_CATEGORIES,
	OPEN_TRIVIA_CATEGORIES,
	TRIVIA_DART_CATEGORIES,
} from "../constants/trivia";
import { decodeHTML, shuffleAnswers, getTriviaUrl, handleTriviaError } from "../utils/trivia";

const INITIAL_STATE: TriviaState = {
	selectedSource: Object.keys(TRIVIA_SOURCES)[0],
	selectedCategory: "Any",
	question: null,
	answer: null,
	questionType: null,
	showAnswer: false,
	options: [],
	loading: false,
	error: null,
	showAlert: true,
	answerToastShown: false,
};

const ENABLE_TRIVIADART = Object.prototype.hasOwnProperty.call(TRIVIA_SOURCES, "TriviaDart");

const Trivia = () => {
	const [state, setState] = useState<TriviaState>(INITIAL_STATE);
	const [hasShownQuestion, setHasShownQuestion] = useState(false);

	const handleSourceChange = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		setState(prev => ({
			...prev,
			selectedSource: value,
			selectedCategory: "Any",
			showAnswer: false,
		}));
	};

	const handleCategoryChange = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		setState(prev => ({
			...prev,
			selectedCategory: value,
			showAnswer: false,
		}));
		if (state.question) {
			handleButtonClick();
		}
	};

	const handleButtonClick = async () => {
		setHasShownQuestion(true);
		setState(prev => ({
			...prev,
			loading: true,
			showAnswer: false,
			error: null,
			question: null,
			answerToastShown: false,
		}));

		try {
			if (ENABLE_TRIVIADART && state.selectedSource === "TriviaDart") {
				const { data, error } = await supabase.rpc("get_random_question", {
					input_category: TRIVIA_DART_CATEGORIES[state.selectedCategory],
				});

				if (error) {
					throw new Error(`Error fetching data from SupaBase: ${error.message}`);
				}

				if (!data || data.length === 0) {
					throw new Error("No questions found for this category.");
				}

				const question = data[0];
				setState(prev => ({
					...prev,
					question: question.question,
					answer: question.answer,
					options: shuffleAnswers([...question.incorrect_answers, question.answer]),
				}));
			} else {
				const headers: Record<string, string> = {};
				if (state.selectedSource === "TriviaDart") {
					headers["x-api-key"] = import.meta.env.VITE_TRIVIA_DART_APIKEY;
				}

				const triviaUrl = getTriviaUrl(
					state.selectedSource,
					state.selectedCategory,
					TRIVIA_SOURCES,
					state.selectedSource === "Open Trivia DB"
						? OPEN_TRIVIA_CATEGORIES
						: TRIVIA_DB_CATEGORIES
				);

				const response = await fetch(triviaUrl, { headers });
				if (state.selectedSource === "Open Trivia DB" && response.status === 429) {
					toast.error("Rate limited from Open Trivia DB. Please wait a moment.", { position: "top-center" });
					setState(prev => ({ ...prev, loading: false }));
					return;
				}
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data: TriviaResponse = await response.json();

				if (state.selectedSource === "Open Trivia DB") {
					if (data.response_code === 5) {
						throw new Error("Rate limited from Open Trivia DB");
					}

					if (!data.results?.[0]) {
						throw new Error("No question data received");
					}

					const question = data.results[0];
					const allAnswers = [
						decodeHTML(question.correct_answer || ""),
						...(question.incorrect_answers || []).map((answer: string) =>
							decodeHTML(answer)
						),
					];
					setState(prev => ({
						...prev,
						options: shuffleAnswers(allAnswers),
						question: decodeHTML(question.question),
						answer: decodeHTML(question.correct_answer || ""),
						questionType: question.type || null,
					}));
				} else {
					if (!Array.isArray(data) || !data[0]) {
						throw new Error("Invalid response format from The Trivia API");
					}

					const question = data[0];
					const allAnswers = [
						decodeHTML(question.correctAnswer || ""),
						...(question.incorrectAnswers || []).map((answer: string) =>
							decodeHTML(answer)
						),
					];
					setState(prev => ({
						...prev,
						options: shuffleAnswers(allAnswers),
						question: decodeHTML(question.question),
						answer: decodeHTML(question.correctAnswer || ""),
						questionType: null,
					}));
				}
			}
		} catch (error: unknown) {
			const errorMessage = handleTriviaError(error);
			setState(prev => ({ ...prev, error: errorMessage }));
			toast.error(errorMessage, { position: "top-center" });
		} finally {
			setState(prev => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className="my-1 flex flex-col items-center pt-4">
			<div className="pt-3 pb-5 text-5xl font-mono select-none">Trivia🎯</div>
			<div className="flex py-4">
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Source</span>
					</label>
					<select
						value={state.selectedSource}
						onChange={handleSourceChange}
						className="select select-bordered w-full max-w-lg"
					>
						{Object.keys(TRIVIA_SOURCES).map((source, i) => (
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
						value={state.selectedCategory}
						onChange={handleCategoryChange}
						className="select select-bordered w-full max-w-lg"
					>
						{Object.keys(
							state.selectedSource === "Open Trivia DB"
								? OPEN_TRIVIA_CATEGORIES
								: ENABLE_TRIVIADART && state.selectedSource === "TriviaDart"
								? TRIVIA_DART_CATEGORIES
								: TRIVIA_DB_CATEGORIES
						).map((category, i) => (
							<option key={i} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
			</div>

			{state.selectedSource === "Open Trivia DB" && state.showAlert && (
				<div className="alert alert-warning shadow-lg flex items-center justify-between max-w-xl px-6 py-3 mt-4">
					<div className="flex items-center gap-3">
						<FontAwesomeIcon icon={faCircleQuestion} className="text-2xl" />
						<span className="text-base">
							<strong>Open Trivia DB Rate Limit:</strong> 1 request per second. Please wait between questions.
						</span>
					</div>
					<button
						className="btn btn-sm btn-ghost ml-4"
						onClick={() => setState(prev => ({ ...prev, showAlert: false }))}
						aria-label="Close rate limit alert"
					>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</div>
			)}

			{state.question && (
				<div className="mt-4 mb-6 w-full max-w-2xl flex flex-col items-center px-5 sm:px-0">
					<p className="text-xl mb-6 text-center w-full flex items-center justify-center min-h-[3.5rem] text-base-content">
						{state.question}
					</p>
					<div className="grid grid-cols-1 gap-2 w-full">
						{state.options.map((option, index) => (
							<button
								key={index}
								className={`btn w-full ${
									state.showAnswer
										? option === state.answer
											? "btn-success"
											: "btn-error"
										: "btn-primary"
								}`}
								onClick={() => {
									setState(prev => ({ ...prev, showAnswer: true }));
									if (!state.answerToastShown) {
										if (option === state.answer) {
											toast.success("Correct!", { position: "bottom-center" });
										} else {
											toast.error("Incorrect!", { position: "bottom-center" });
										}
										setState(prev => ({ ...prev, answerToastShown: true }));
									}
								}}
							>
								{option}
							</button>
						))}
					</div>
				</div>
			)}

			{state.question && !state.loading && (
				<div className="flex justify-center mb-10">
					<button
						className="btn btn-primary"
						onClick={handleButtonClick}
						disabled={state.loading}
					>
						{hasShownQuestion ? "Next Question" : state.loading ? "Loading..." : "Get Question"}
					</button>
				</div>
			)}

			{!state.question && (
				<button
					className="btn btn-primary mt-4"
					onClick={handleButtonClick}
					disabled={state.loading}
				>
					{hasShownQuestion ? "Next Question" : state.loading ? "Loading..." : "Get Question"}
				</button>
			)}

			<div className="fixed bottom-4 right-4 flex gap-2">
				<label htmlFor="about-modal">
					<FontAwesomeIcon icon={faCircleQuestion} className="text-4xl" />
				</label>
				<label htmlFor="settings-modal">
					<FontAwesomeIcon icon={faGears} className="text-4xl" />
				</label>
			</div>

			<About />
			<Settings />
			<Toaster position="bottom-center" />
		</div>
	);
};

export default Trivia;
