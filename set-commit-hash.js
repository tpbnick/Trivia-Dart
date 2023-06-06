import { execSync } from "child_process";
import { writeFileSync } from "fs";

const gitCommitHash = execSync("git rev-parse --short HEAD").toString().trim();
writeFileSync(".env.local", `VITE_GIT_SHA=${gitCommitHash}`);
