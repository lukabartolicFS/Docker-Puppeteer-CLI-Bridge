const fs = require("fs");
const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 1111;

app.get("/", (req, res) => {
  res.send("Available endpoint(s): /convert");
});

app.get("/convert", (req, res) => {
  const url = req.query.url;

  if (!url) res.send("Missing url query parameter");

  const converter = spawn("node", ["client.js", url]);

  let buffs = [];

  converter.stdout.on("data", (data) => {
    buffs.push(data);
  });

  converter.stderr.on("data", (data) => {});

  converter.on("close", (code) => {
    const buff = Buffer.concat(buffs);
    //fs.writeFile("buff.pdf", buff, function (err) {});
    res.send(buff.toString("base64"));
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
