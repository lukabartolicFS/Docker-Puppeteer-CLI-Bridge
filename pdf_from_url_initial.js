const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = process.argv[2];
  const filePath = process.argv[3];
  const fileName = process.argv[4];

  await page.goto(url, {
    waitUntil: "networkidle2",
  });

  const pdf = await page.pdf({
    path: filePath + "/" + fileName + ".pdf",
    format: "A4",
  });

  await browser.close();

  console.log(filePath + "/" + fileName + ".pdf");
})();
