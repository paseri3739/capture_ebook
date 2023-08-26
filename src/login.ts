// import the new switchToLastTab function from the separate file
import { Browser, Page } from 'playwright';
import { switchToLastTab } from './switch_to_last_tab';

async function login(page: Page, browser: Browser): Promise<Page> {
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

    // Switch to the last tab and bring it to the front using the new function
    const lastPage = await switchToLastTab(browser);
    if (lastPage !== null) {
        console.log("moved to: " + await lastPage.url());
    } else {
        console.log("Could not switch to the last tab.");
    }

    return lastPage ? lastPage : page;  // If lastPage is null, return the current page
}

export { login };
