import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function run(cmd: string) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: rootDir, stdio: "inherit" });
}

run("npx vite build");

run(
  "npx esbuild server/index.ts --platform=node --packages=external --bundle --format=cjs --outfile=dist/index.cjs --external:../vite.config --external:nanoid"
);

console.log("Build complete.");
