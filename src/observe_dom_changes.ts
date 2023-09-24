import { Page } from 'playwright';

export async function observeDOMChanges(page: Page): Promise<void> {
    await page.exposeFunction('domChanged', () => {
        console.log('DOM Changed');
    });

    await page.evaluate(() => {
        const observer = new MutationObserver(() => {
            // @ts-ignore: 'domChanged' function is exposed to the window object
            window.domChanged();
        });

        observer.observe(document, { attributes: true, childList: true, subtree: true });
    });
}
