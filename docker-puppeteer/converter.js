const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const url = process.argv[2];

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const pdf = await page.pdf({
    format: "A4",
  });

  await browser.close();

  process.stdout.write(pdf);
})();
