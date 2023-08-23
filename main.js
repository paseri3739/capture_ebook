const { Builder, By, Key } = require('selenium-webdriver');
const fs = require('fs');
const PDFDocument = require('pdfkit');

let imageCounter = 1;
const imageDirectory = 'screenshots';
const pdfOutputPath = 'output.pdf';

if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory);
}

(async function () {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('YOUR_URL');

        while (true) {
            const elements = await driver.findElements(By.css('#imageContents'));

            if (elements.length === 0) break; // No more elements to capture

            for (let element of elements) {
                let image = await element.takeScreenshot();
                fs.writeFileSync(`${imageDirectory}/screenshot${imageCounter}.png`, image, 'base64');
                imageCounter++;
            }

            await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
            // 少し待つことで、新しいページの要素が読み込まれるのを待ちます。
            // 必要に応じて待機時間を調整してください。
            await driver.sleep(2000);
        }

    } finally {
        await driver.quit();
    }

    createPDF();
})();

function createPDF() {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfOutputPath));

    const images = fs.readdirSync(imageDirectory).sort().map(name => `${imageDirectory}/${name}`);
    images.forEach((imagePath, index) => {
        if (index > 0) doc.addPage();
        doc.image(imagePath, {
            fit: [doc.page.width, doc.page.height]
        });
    });

    doc.end();
}
