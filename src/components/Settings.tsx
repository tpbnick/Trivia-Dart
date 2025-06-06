import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SettingsState, Theme, Font } from "../types/settings";
import { AVAILABLE_THEMES, AVAILABLE_FONTS, FONT_SIZE } from "../constants/settings";
import { loadSettings, saveSettings, applySettings } from "../utils/settings";

const Settings = () => {
	const [settings, setSettings] = useState<SettingsState>(loadSettings());

	const capitalizeFirstLetter = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedTheme = event.target.value as Theme;
		const newSettings = { ...settings, theme: selectedTheme };
		setSettings(newSettings);
		saveSettings(newSettings);
		toast.success(`Theme changed to ${capitalizeFirstLetter(selectedTheme)}`);
	};

	const handleFontChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedFont = event.target.value as Font;
		const newSettings = { ...settings, font: selectedFont };
		setSettings(newSettings);
		saveSettings(newSettings);
	};

	const handleFontSizeChange = (action: "increment" | "decrement") => {
		const newFontSize = action === "increment"
			? settings.fontSize + FONT_SIZE.STEP
			: settings.fontSize - FONT_SIZE.STEP;

		if (newFontSize >= FONT_SIZE.MIN && newFontSize <= FONT_SIZE.MAX) {
			const newSettings = { ...settings, fontSize: newFontSize };
			setSettings(newSettings);
			saveSettings(newSettings);
		}
	};

	useEffect(() => {
		applySettings(settings);
	}, [settings]);

	return (
		<div>
			<input type="checkbox" id="settings-modal" className="modal-toggle" />
			<label htmlFor="settings-modal" className="modal cursor-pointer">
				<div className="modal-box relative">
					<label
						htmlFor="settings-modal"
						className="btn btn-sm btn-circle absolute right-3 top-3"
						aria-label="Close settings modal"
					>
						✕
					</label>
					<h3 className="text-2xl font-bold">Settings</h3>
					<div className="py-3 px-10">
						<label
							htmlFor="theme-select"
							className="block text-center mb-2 font-bold"
						>
							Select Theme:
						</label>
						<select
							id="theme-select"
							value={settings.theme}
							onChange={handleThemeChange}
							className="select select-bordered block w-full"
						>
							{AVAILABLE_THEMES.map((theme) => (
								<option key={theme} value={theme}>
									{capitalizeFirstLetter(theme)}
								</option>
							))}
						</select>
					</div>
					<div className="py-3 px-10">
						<label htmlFor="font-select" className="block text-center mb-2 font-bold">
							Select Font:
						</label>
						<select
							id="font-select"
							value={settings.font}
							onChange={handleFontChange}
							className="select select-bordered block w-full"
						>
							{AVAILABLE_FONTS.map((font) => (
								<option key={font} value={font}>
									{font}
								</option>
							))}
						</select>
					</div>
					<div className="form-control flex justify-between items-center">
						<label className="label">
							<span className="label-text">Change font size:</span>
						</label>
						<div className="flex items-center">
							<button
								type="button"
								onClick={() => handleFontSizeChange("decrement")}
								className={`btn btn-sm btn-secondary text-xl flex items-center justify-center w-8 h-8 ${
									settings.fontSize <= FONT_SIZE.MIN ? "btn-disabled" : ""
								}`}
								disabled={settings.fontSize <= FONT_SIZE.MIN}
							>
								-
							</button>
							<span className="mx-2 text-xl">{settings.fontSize}</span>
							<button
								type="button"
								onClick={() => handleFontSizeChange("increment")}
								className={`btn btn-sm btn-secondary text-xl flex items-center justify-center w-8 h-8 ${
									settings.fontSize >= FONT_SIZE.MAX ? "btn-disabled" : ""
								}`}
								disabled={settings.fontSize >= FONT_SIZE.MAX}
							>
								+
							</button>
						</div>
					</div>
				</div>
			</label>
		</div>
	);
};

export default Settings;
