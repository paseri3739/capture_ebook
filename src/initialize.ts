import { Browser, Page, chromium } from 'playwright';

async function initialize(initialUrl: string): Promise<{ browser: Browser, page: Page }> {
    console.log(initialUrl);

    const browser: Browser = await chromium.launch({ headless: false });
    const page: Page = await browser.newPage();
    //await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(initialUrl, { waitUntil: 'networkidle' });

    return { browser, page };
}

export { initialize };
