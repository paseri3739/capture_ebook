import { Page } from 'puppeteer';
import readlineModule from 'readline';
import { getEbookType } from "./get_ebook_type";

async function loopQuestion(page: Page) {
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readl.question('Press Enter when done.', async (answer: string) => {
        readl.close();
        const ebookType: string = await getEbookType(page);
        console.log("Ebook Type:", ebookType);
        await page.evaluate((ebookType: string) => {
            window.alert(ebookType);
        }, ebookType);
        loopQuestion(page);  // 再帰的に質問を繰り返す
    });
};

export { loopQuestion };
