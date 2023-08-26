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

    // readline インターフェースを一度だけ作成
    const readl = readlineModule.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // 無限ループ
    while (true) {
        await new Promise(resolve => {
            readl.question('Press Enter when done.', async (answer: string) => {
                await processPage(newPage);
                resolve(null);
            });
        });
    }
})();
