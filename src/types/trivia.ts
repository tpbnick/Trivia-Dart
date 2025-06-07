export interface TriviaQuestion {
	question: string;
	answer: string;
	incorrect_answers?: string[];
	correct_answer?: string;
	correctAnswer?: string;
	incorrectAnswers?: string[];
	type?: string;
}

export interface TriviaResponse {
	results?: TriviaQuestion[];
	response_code?: number;
}

export interface TriviaSource {
	[key: string]: string;
}

export interface TriviaCategory {
	[key: string]: string | number;
}

export interface TriviaState {
	selectedSource: string;
	selectedCategory: string;
	question: string | null;
	answer: string | null;
	questionType: string | null;
	showAnswer: boolean;
	options: string[];
	loading: boolean;
	error: string | null;
	showAlert: boolean;
	answerToastShown: boolean;
} 