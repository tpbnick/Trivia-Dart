import { ChangeEvent, useEffect, useState } from "react";

const Settings = () => {
	const availableThemes = [
		"dark",
		"light",
		"aqua",
		"black",
		"business",
		"cmyk",
		"cyberpunk",
		"dracula",
		"emerald",
		"night",
		"synthwave",
		"valentine",
		"wireframe",
	];

	const availableFonts = ["Cambria", "Monospace", "Roboto", "Times New Roman"];

	const storedTheme = localStorage.getItem("selectedTheme") || "dark";
	const [currentTheme, setCurrentTheme] = useState(storedTheme);

	const storedFont = localStorage.getItem("selectedFont") || "Roboto";
	const [currentFont, setCurrentFont] = useState(storedFont);

	const storedFontSize = parseInt(
		localStorage.getItem("selectedFontSize") || "16",
		10
	);
	const [currentFontSize, setCurrentFontSize] = useState<number>(
		storedFontSize || 16
	);

	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedTheme = event.target.value;
		setCurrentTheme(selectedTheme);
		document.documentElement.setAttribute("data-theme", selectedTheme);
		localStorage.setItem("selectedTheme", selectedTheme);
	};

	const handleFontChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedFont = event.target.value;
		setCurrentFont(selectedFont);
		localStorage.setItem("selectedFont", selectedFont);
		document.documentElement.style.fontFamily = selectedFont;
	};

	const handleFontSizeChange = (action: "increment" | "decrement") => {
		let newFontSize = currentFontSize || 12;

		if (action === "increment") {
			newFontSize += 2;
		} else if (action === "decrement") {
			newFontSize -= 2;
		}

		setCurrentFontSize(newFontSize);
		localStorage.setItem("selectedFontSize", `${newFontSize}`);
	};

	useEffect(() => {
		document.documentElement.style.fontFamily = currentFont;
		document.documentElement.setAttribute("data-theme", currentTheme);
		document.documentElement.style.fontSize = `${currentFontSize}px`;
	}, [currentFont, currentTheme, currentFontSize]);

	return (
		<div>
			<input type="checkbox" id="settings-modal" className="modal-toggle" />
			<label htmlFor="settings-modal" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<label
						htmlFor="settings-modal"
						className="btn btn-sm btn-circle absolute right-3 top-3"
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
							value={currentTheme}
							onChange={handleThemeChange}
							className="select select-bordered block w-full"
						>
							{availableThemes.map((theme) => (
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
							value={currentFont}
							onChange={handleFontChange}
							className="select select-bordered block w-full"
						>
							{availableFonts.map((font) => (
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
								className="btn btn-sm btn-secondary text-xl flex items-center justify-center w-8 h-8"
							>
								-
							</button>
							<span className="mx-2 text-xl">{currentFontSize}</span>
							<button
								type="button"
								onClick={() => handleFontSizeChange("increment")}
								className="btn btn-sm btn-secondary text-xl flex items-center justify-center w-8 h-8"
							>
								+
							</button>
						</div>
					</div>
				</label>
			</label>
		</div>
	);
};

export default Settings;
