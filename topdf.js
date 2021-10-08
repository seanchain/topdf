const puppeteer = require("puppeteer-core");

const path = require("path");

function getFileUrl(str) {
  var pathName = path.resolve(str).replace(/\\/g, "/");
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
}

const myArgs = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "./chromium/chrome.exe",
  });
  const page = await browser.newPage();

  const fileName = myArgs[0];
  const pdfName = fileName.replace(".html", ".pdf");

  const address = getFileUrl(fileName);

  await page.goto(address, {
    waitUntil: "networkidle2",
  });

  await page.pdf({ path: pdfName, format: "a4" });

  await browser.close();
})();
