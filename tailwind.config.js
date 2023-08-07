module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

	darkMode: "media",
	daisyui: {
		themes: [
			"light",
			"dark",
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
		],
	},

	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
		require("daisyui"),
	],
};
