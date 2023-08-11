import { execSync } from "child_process";
import { writeFileSync } from "fs";

const gitCommitHash = execSync("git rev-parse --short HEAD").toString().trim();

const currentDate = new Date();
currentDate.setHours(currentDate.getHours() - 5); // EST
const formattedDate = currentDate.toISOString().split("T")[0];

writeFileSync(
	".env.local",
	`VITE_GIT_SHA=${gitCommitHash}\nVITE_BUILD_DATE=${formattedDate}`
);

// color codes
const green = "\x1b[32m";
const blue = "\x1b[34m";
const reset = "\x1b[0m";

console.log(
	`${green}Setting Commit Hash!\n${reset}Using commit: ${blue}${gitCommitHash}${reset} and date: ${blue}${formattedDate}${reset}`
);
