import { config as dotenvConfig } from 'dotenv';
import { Browser, Page } from 'playwright';
import readline from 'readline';
import { initialize } from './initialize';
import { login } from './login';
import { observeDOMChanges } from './observe_dom_changes';
import { processPage } from './process_page';

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;
    const { browser, page } = await initialize(initialUrl);
    const newPage = await login(page, browser);

    await observeDOMChanges(newPage);

    await monitorURLChanges(newPage);

    await interactWithConsole(newPage, browser);
})();

async function monitorURLChanges(page: Page): Promise<void> {
    let currentUrl = await page.url();
    page.on('framenavigated', async frame => {
        const newUrl = frame.url();
        if (newUrl !== currentUrl) {
            console.log(`URL has changed to: ${newUrl}`);
            currentUrl = newUrl;
        }
    });
}

async function interactWithConsole(page: Page, browser: Browser): Promise<void> {
    const readl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        await new Promise<void>(resolve => {
            readl.question('Press Enter when done or type "exit" to quit.\n', async (answer: string) => {
                if (answer.toLowerCase() === 'exit') {
                    await browser.close();
                    readl.close();
                    process.exit(0);
                } else {
                    await processPage(page);
                    resolve();
                }
            });
        });
    }
}
