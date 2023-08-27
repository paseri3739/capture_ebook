import { Page } from 'puppeteer';
import readlineModule from 'readline';

async function loopQuestion(page: Page) {
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readl.question('Press Enter when done.', async (answer: string) => {
        readl.close();
        //const ebookType: string = await getEbookType(page);
        //console.log("Ebook Type:", ebookType);
        const links = await page.$$eval('a', anchors => {
            return anchors.map(anchor => {
                return {
                    href: anchor.href,
                    text: anchor.textContent
                };
            });
        });

        // 取得したリンクをコンソールに出力する
        console.log(links);
        loopQuestion(page);  // 再帰的に質問を繰り返す
    });
};

export { loopQuestion };
