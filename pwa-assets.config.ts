import {
	defineConfig,
	minimalPreset as preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
	preset,
	images: [
		"public/dart.webp",
		"public/dart.ico",
		"public/dart.svg",
		"public/dart.png",
	],
});
