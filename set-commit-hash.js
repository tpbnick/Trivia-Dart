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

console.log(
	`Setting Commit Hash!\nUsing commit: ${gitCommitHash} and date: ${formattedDate}`
);
