// import the necessary classes from playwright
import { Page } from 'playwright';

async function login(page: Page): Promise<Page> {
    await page.fill('#usrcardnumber', process.env.USER_NAME!);
    await page.click('#password');
    await page.fill('#password', process.env.PASSWORD!);
    await page.waitForTimeout(1000);
    await page.click('.exec');
    await page.waitForTimeout(1000);

    // Get the BrowserContext from the page (assuming there is only one context)
    const context = page.context();

    // Await new page to open
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('//a[contains(text(), "電子図書館")]')  // Assuming this click leads to a new tab
    ]);

    console.log("moved to: " + await newPage.url());

    return newPage;
}

export { login };
