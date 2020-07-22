const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const type = process.argv[2];
  const source = process.argv[3];

  const basePath = path.join(__dirname, "static", "exports");
  const fileName = `export_${uuid.v4()}`;

  if (type == "url") {
    await page.goto(source, {
      waitUntil: "networkidle2",
    });
  } else {
    await page.setContent(source, {
      waitUntil: "networkidle2",
    });
  }

  const pdfOptions = {
    path: `${basePath}/${fileName}.pdf`,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  const pdf = await page.pdf(pdfOptions);

  await browser.close();

  process.stdout.write(pdf);
})();
