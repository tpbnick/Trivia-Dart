import { Theme, Font } from '../types/settings';

export const AVAILABLE_THEMES: Theme[] = [
	"light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
	"synthwave", "retro", "cyberpunk", "valentine", "halloween",
	"garden", "forest", "aqua", "lofi", "pastel", "fantasy",
	"wireframe", "black", "luxury", "dracula", "cmyk", "autumn",
	"business", "acid", "lemonade", "night", "coffee", "winter",
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