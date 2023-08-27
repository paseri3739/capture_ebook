// process_page.ts
import { Page } from 'playwright';

async function processPage(page: Page) {
    const currentUrl = await page.url();  // await を追加
    console.log(`Target URL: ${currentUrl}`);

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

export { processPage };
