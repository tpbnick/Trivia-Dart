module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

	darkMode: "media",
	theme: {
		extend: {
			textColor: ["responsive", "hover", "focus"],
			colors: {
				atom1: "#40444f",
				atom2: "#4e5466",
			},
		},
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
