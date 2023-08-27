import { Page } from 'playwright';

//definition
export async function monitorURLChanges(page: Page): Promise<void> {
    let currentUrl = await page.url();
    page.on('framenavigated', async (frame) => {
        const newUrl = frame.url();
        if (newUrl !== currentUrl) {
            console.log(`URL has changed to: ${newUrl}`);
            currentUrl = newUrl;
        }
    });
}
