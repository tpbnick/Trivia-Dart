import { SettingsState, Theme, Font, DEFAULT_SETTINGS } from '../types/settings';

export const loadSettings = (): SettingsState => {
	try {
		const storedTheme = localStorage.getItem("selectedTheme") as Theme;
		const storedFont = localStorage.getItem("selectedFont") as Font;
		const storedFontSize = parseInt(
			localStorage.getItem("selectedFontSize") || "16",
			10
		);

		return {
			theme: storedTheme || DEFAULT_SETTINGS.theme,
			font: storedFont || DEFAULT_SETTINGS.font,
			fontSize: storedFontSize || DEFAULT_SETTINGS.fontSize,
		};
	} catch (error) {
		console.error("Error loading settings:", error);
		return DEFAULT_SETTINGS;
	}
};

export const saveSettings = (settings: SettingsState): void => {
	try {
		localStorage.setItem("selectedTheme", settings.theme);
		localStorage.setItem("selectedFont", settings.font);
		localStorage.setItem("selectedFontSize", settings.fontSize.toString());
	} catch (error) {
		console.error("Error saving settings:", error);
	}
};

export const applySettings = (settings: SettingsState): void => {
	document.documentElement.style.fontFamily = settings.font;
	document.documentElement.setAttribute("data-theme", settings.theme);
	document.documentElement.style.fontSize = `${settings.fontSize}px`;
}; 