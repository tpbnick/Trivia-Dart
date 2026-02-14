import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { SettingsState, Theme, Font } from "../types/settings";
import { AVAILABLE_THEMES, AVAILABLE_FONTS, FONT_SIZE } from "../constants/settings";
import { loadSettings, saveSettings, applySettings } from "../utils/settings";

const Settings = () => {
	const [settings, setSettings] = useState<SettingsState>(loadSettings());

	const capitalizeFirstLetter = useCallback((str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}, []);

	const handleThemeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTheme = event.target.value as Theme;
		setSettings(prev => {
			const newSettings = { ...prev, theme: selectedTheme };
			saveSettings(newSettings);
			return newSettings;
		});
		toast.success(`Theme changed to ${capitalizeFirstLetter(selectedTheme)}`);
	}, [capitalizeFirstLetter]);

	const handleFontChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedFont = event.target.value as Font;
		setSettings(prev => {
			const newSettings = { ...prev, font: selectedFont };
			saveSettings(newSettings);
			return newSettings;
		});
	}, []);

	const handleFontSizeChange = useCallback((action: "increment" | "decrement") => {
		setSettings(prev => {
			const newFontSize = action === "increment"
				? prev.fontSize + FONT_SIZE.STEP
				: prev.fontSize - FONT_SIZE.STEP;
			if (newFontSize >= FONT_SIZE.MIN && newFontSize <= FONT_SIZE.MAX) {
				const newSettings = { ...prev, fontSize: newFontSize };
				saveSettings(newSettings);
				return newSettings;
			}
			return prev;
		});
	}, []);

	useEffect(() => {
		applySettings(settings);
	}, [settings]);

	return (
		<div>
			<input type="checkbox" id="settings-modal" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box relative max-h-[90vh] overflow-y-auto">
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
					<div className="form-control flex flex-col items-center gap-3">
						<label className="label">
							<span className="label-text">Change font size:</span>
						</label>
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => handleFontSizeChange("decrement")}
								className={`btn btn-sm btn-neutral text-xl flex items-center justify-center w-8 h-8 ${
									settings.fontSize <= FONT_SIZE.MIN ? "btn-disabled" : ""
								}`}
								disabled={settings.fontSize <= FONT_SIZE.MIN}
							>
								-
							</button>
							<span className="text-xl min-w-[2rem] text-center">{settings.fontSize}</span>
							<button
								type="button"
								onClick={() => handleFontSizeChange("increment")}
								className={`btn btn-sm btn-neutral text-xl flex items-center justify-center w-8 h-8 ${
									settings.fontSize >= FONT_SIZE.MAX ? "btn-disabled" : ""
								}`}
								disabled={settings.fontSize >= FONT_SIZE.MAX}
							>
								+
							</button>
						</div>
					</div>
				</div>
				<label className="modal-backdrop" htmlFor="settings-modal">Close</label>
			</div>
		</div>
	);
};

export default Settings;
