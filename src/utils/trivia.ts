export const decodeHTML = (html: string): string => {
	const txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
};

export const shuffleAnswers = (array: string[]): string[] => {
	return array.sort(() => Math.random() - 0.5);
};

export const getTriviaUrl = (
	selectedSource: string,
	selectedCategory: string,
	sources: Record<string, string>,
	categories: Record<string, string | number>
): string => {
	let triviaUrl = sources[selectedSource];
	if (selectedSource === "Open Trivia DB" && selectedCategory !== "Any") {
		triviaUrl += `&category=${categories[selectedCategory]}`;
	} else if (selectedSource === "The Trivia API" && selectedCategory !== "Any") {
		triviaUrl += `&categories=${categories[selectedCategory]}`;
	}
	// Add similar logic for TriviaDart if needed
	return triviaUrl;
};

export const handleTriviaError = (error: unknown): string => {
	if (error instanceof Error) {
		console.error("Trivia error:", error);
		return error.message;
	}
	return "An unknown error occurred while fetching trivia";
}; 