import { Theme, Font } from '../types/settings';

export const AVAILABLE_THEMES: Theme[] = [
	"abyss", "acid", "aqua", "autumn", "black", "bumblebee",
	"business", "caramellatte", "coffee", "corporate", "cmyk", "cupcake",
	"cyberpunk", "dark", "dim", "dracula", "emerald", "fantasy",
	"forest", "garden", "halloween", "lemonade", "light", "lofi",
	"luxury", "night", "nord", "pastel", "retro", "silk",
	"sunset", "synthwave", "valentine", "wireframe", "winter",
];

export const AVAILABLE_FONTS: Font[] = [
	"Roboto",
	"Roboto Mono",
	"Sono",
	"Montserrat",
	"Times New Roman",
];

export const FONT_SIZE = {
	MIN: 12,
	MAX: 24,
	STEP: 2,
} as const; 