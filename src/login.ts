import { Browser, Page } from 'puppeteer';

async function login(page: Page, browser: Browser): Promise<void> {
    await page.type('#usrcardnumber', process.env.USER_NAME!);
    await page.click('#password');
    await page.type('#password', process.env.PASSWORD!);
    await page.click('.exec');
    const currentHandle = page;
    await page.evaluate(() => {
        const link = Array.from(document.querySelectorAll('a')).find(el => el.textContent === '電子図書館');
        if (link) link.click();
    });
}

export { login };
