export type Theme = 
	| "abyss" | "acid" | "aqua" | "autumn" | "black" | "bumblebee"
	| "business" | "caramellatte" | "coffee" | "corporate" | "cmyk" | "cupcake"
	| "cyberpunk" | "dark" | "dim" | "dracula" | "emerald" | "fantasy"
	| "forest" | "garden" | "halloween" | "lemonade" | "light" | "lofi"
	| "luxury" | "night" | "nord" | "pastel" | "retro" | "silk"
	| "sunset" | "synthwave" | "valentine" | "wireframe" | "winter";

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