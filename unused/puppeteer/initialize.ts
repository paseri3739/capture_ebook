import puppeteer, { Browser, Page } from 'puppeteer';

async function initialize(initialUrl: string): Promise<{ browser: Browser, page: Page }> {
    console.log(initialUrl);

    const browser: Browser = await puppeteer.launch({ headless: false });
    const [page]: Page[] = await browser.pages();
    await page.setViewport({ width: 1280, height: 800 });
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    await page.setUserAgent(userAgent)
    await page.goto(initialUrl, { waitUntil: 'networkidle0' });

    return { browser, page };
}

export { initialize };
