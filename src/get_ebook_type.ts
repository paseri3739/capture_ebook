import { Page } from 'puppeteer';

async function getEbookType(page: Page): Promise<string> {
    const xpathForFormat = "//span[contains(text(), '形式') and contains(text(), ':')]/following-sibling::span[1]";
    const formatElements = await page.$x(xpathForFormat);

    if (formatElements.length > 0) {
        const formatElement = formatElements[0];

        const formatText = await page.evaluate((el: Node) => {
            if (el.textContent !== null) {
                return el.textContent.trim();
            } else {
                return "";
            }
        }, formatElement);


        if (formatText === "PDF") {
            return "PDF";
        }
        if (formatText === "EPUB") {
            return "EPUB";
        }
        return "Unknown Format";
    } else {
        return "Format Element Not Found";
    }
}

export { getEbookType };
