import { Browser, Page } from 'playwright';
import readline from 'readline';
import { processPage } from './process_page';

export async function interactWithConsole(page: Page, browser: Browser): Promise<void> {
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
