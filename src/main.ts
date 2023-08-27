// main.ts
import { config as dotenvConfig } from 'dotenv';
import readlineModule from 'readline';
import { initialize } from './initialize';
import { login } from './login';
import { processPage } from './process_page';

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;
    const { browser, page } = await initialize(initialUrl);
    const newPage = await login(page, browser);

    // ページ遷移を監視。 非同期処理なのでループ内でもイベントを起点に動作するようになっている。
    let currentUrl = await newPage.url();
    newPage.on('framenavigated', async frame => {
        const newUrl = frame.url();
        if (newUrl !== currentUrl) {
            console.log(`URL has changed to: ${newUrl}`);
            currentUrl = newUrl;
            // 新しいURLで何らかの処理を行う場合はここに記述
        }
    });

    // readline インターフェースを一度だけ作成
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // 無限ループ
    while (true) {
        await new Promise(resolve => {
            readl.question('Press Enter when done.\n', async (answer: string) => {
                await newPage.reload();
                await newPage.waitForLoadState();
                await processPage(newPage);
                resolve(null);
            });
        });
    }
})();
