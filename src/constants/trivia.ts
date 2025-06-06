import { TriviaSource, TriviaCategory } from '../types/trivia';

const ENABLE_TRIVIADART = import.meta.env.VITE_ENABLE_TRIVIADART === "true";

export const TRIVIA_DART_URL = "/api/triviadart";

export const TRIVIA_SOURCES: Record<string, string> = {
	...(ENABLE_TRIVIADART ? { TriviaDart: TRIVIA_DART_URL } : {}),
	"The Trivia API": "https://the-trivia-api.com/api/questions?limit=1",
	"Open Trivia DB": "https://opentdb.com/api.php?amount=1",
};

export const TRIVIA_DB_CATEGORIES: TriviaCategory = {
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

export const OPEN_TRIVIA_CATEGORIES: TriviaCategory = {
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

export const TRIVIA_DART_CATEGORIES: TriviaCategory = {
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

export const TRIVIA_DART_CATEGORIES_ENABLED = ENABLE_TRIVIADART ? TRIVIA_DART_CATEGORIES : {}; 