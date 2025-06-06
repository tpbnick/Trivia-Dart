export type Theme = 
	| "light" | "dark" | "cupcake" | "bumblebee" | "emerald" | "corporate"
	| "synthwave" | "retro" | "cyberpunk" | "valentine" | "halloween"
	| "garden" | "forest" | "aqua" | "lofi" | "pastel" | "fantasy"
	| "wireframe" | "black" | "luxury" | "dracula" | "cmyk" | "autumn"
	| "business" | "acid" | "lemonade" | "night" | "coffee" | "winter";

export type Font = "Roboto" | "Roboto Mono" | "Sono" | "Montserrat" | "Times New Roman";

export interface SettingsState {
	theme: Theme;
	font: Font;
	fontSize: number;
}

export const DEFAULT_SETTINGS: SettingsState = {
	theme: "dark",
	font: "Roboto",
	fontSize: 16,
}; 