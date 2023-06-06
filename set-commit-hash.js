import { execSync } from "child_process";
import { writeFileSync } from "fs";

const gitCommitHash = execSync("git rev-parse --short HEAD").toString().trim();

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const date = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${date}`;

writeFileSync(
	".env.local",
	`VITE_GIT_SHA=${gitCommitHash}\nVITE_BUILD_DATE=${formattedDate}`
);
