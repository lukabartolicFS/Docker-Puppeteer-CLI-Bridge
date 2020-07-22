const { spawn } = require("child_process");

const type = process.argv[2];
const source = process.argv[3];

if (!type || !source) throw Error("Missing type and/or source parameters");

const dockerRunner = spawn("docker", [
  "run",
  "puppeteer",
  `${type}`,
  `${source}`,
]);

dockerRunner.stdout.on("data", (data) => {
  /*
   * Return binary data to calling process
   */
  process.stdout.write(data);
});

dockerRunner.stderr.on("data", (data) => {});

dockerRunner.on("close", (code) => {});
