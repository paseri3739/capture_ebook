import { Page } from 'puppeteer';
import readlineModule from 'readline';
import { getEbookType } from './get_ebook_type';

async function loopQuestion(page: Page) {
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readl.question('Press Enter when done.', async (answer: string) => {
        readl.close();

        // getEbookType関数を文字列化してブラウザ内で実行
        const ebookType: string = await page.evaluate(`
            (${getEbookType.toString()})()
        `) as string;

        console.log("Ebook Type:", ebookType);

        await page.evaluate((ebookType: string) => {
            window.alert(ebookType);
        }, ebookType);

        loopQuestion(page);
    });
}

export { loopQuestion };
