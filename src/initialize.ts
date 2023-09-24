import { Browser, Page, chromium } from 'playwright';

async function initialize(initialUrl: string): Promise<{ browser: Browser, page: Page }> {
    console.log("Initial URL: " + initialUrl);

    const browser: Browser = await chromium.launch({ headless: false, slowMo: 300 });
    const page: Page = await browser.newPage();
    await page.goto(initialUrl, { waitUntil: 'networkidle' });

    return { browser, page };
}

export { initialize };
