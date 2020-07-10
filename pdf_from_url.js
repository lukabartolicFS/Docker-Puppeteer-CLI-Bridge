const { spawn } = require("child_process");

const url = process.argv[2];

const dockerRunner = spawn("docker", ["run", "puppeteer", `${url}`]);

dockerRunner.stdout.on("data", (data) => {
  /*
   * Return binary data to calling process
   */
  process.stdout.write(data);
});

dockerRunner.stderr.on("data", (data) => {});

dockerRunner.on("close", (code) => {});
