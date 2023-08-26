import { Page } from 'playwright';
import readlineModule from 'readline';

async function loopQuestion(page: Page) {
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // 現在のページのURLを取得
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    readl.question('Press Enter when done.', async (answer: string) => {
        readl.close();

        const links = await page.$$eval('a', anchors => {
            return anchors.map(anchor => {
                return {
                    href: anchor.href,
                    text: anchor.textContent
                };
            });
        });

        console.log(links);
        loopQuestion(page);  // 再帰的に質問を繰り返す
    });
};

export { loopQuestion };
