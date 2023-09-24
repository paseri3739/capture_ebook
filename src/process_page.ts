// process_page.ts
import { Page } from 'playwright';

async function processPage(page: Page) {
    const currentUrl = await page.url();
    console.log(`Target URL: ${currentUrl}`);

    await getAllLinks(page);
}

export { processPage };

async function captureEbook(page: Page) {
    // implement here
}

//sample function
async function getAllLinks(page: Page) {
    const links = await page.$$eval('a', anchors => {
        return anchors.map(anchor => {
            return {
                href: anchor.href,
                text: anchor.textContent
            };
        });
    });

    console.log(links);
}
