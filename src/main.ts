import { config as dotenvConfig } from 'dotenv';
import puppeteer, { Browser, Page } from 'puppeteer';
import readlineModule from 'readline';
import { getEbookType } from './get_ebook_type';
import { login } from './login';

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;
    console.log(initialUrl);

    const browser: Browser = await puppeteer.launch({ headless: false });
    const [page]: Page[] = await browser.pages();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(initialUrl, { waitUntil: 'networkidle0' });

    // ここで login 関数を呼び出す
    await login(page, browser);
    console.log("Please complete the manual step and then press Enter.");

    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readl.question('Press Enter when done.', async (answer: string) => {
        readl.close();
        const ebookType: string = await getEbookType(page);
        await page.evaluate((ebookType: string) => {
            window.alert(ebookType);
        }, ebookType);
        await browser.close();
        process.exit();
    });
})();
