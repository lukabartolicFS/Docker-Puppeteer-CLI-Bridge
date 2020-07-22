const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 1111;

const clientPath = path.join(__dirname, "client.js");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Available endpoint(s): POST /convert");
});

app.post("/convert", (req, res) => {
  const url = req.body.url;
  const html = req.body.html;

  if (!url && !html) {
    throw Error("Both url and html parameters are missing");
  }

  const type = !url ? "html" : "url";
  const source = !url ? html : url;

  const converter = spawn("node", [clientPath, type, source]);

  let buffs = [];

  converter.stdout.on("data", (data) => {
    buffs.push(data);
  });

  converter.stderr.on("data", (data) => {});

  converter.on("close", (code) => {
    const buff = Buffer.concat(buffs);
    res.send(buff.toString("base64"));
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
