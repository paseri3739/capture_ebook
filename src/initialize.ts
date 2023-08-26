import puppeteer, { Browser, Page } from 'puppeteer';

async function initialize(initialUrl: string): Promise<{ browser: Browser, page: Page }> {
    console.log(initialUrl);

    const browser: Browser = await puppeteer.launch({ headless: false });
    const [page]: Page[] = await browser.pages();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(initialUrl, { waitUntil: 'networkidle0' });

    return { browser, page };
}

export { initialize };
