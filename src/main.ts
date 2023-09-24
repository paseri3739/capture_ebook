import { config as dotenvConfig } from 'dotenv';
import { Page } from 'playwright';
import { initialize } from './initialize';
import { EBookFormat, interceptJsonRequest } from './intercept_json_request';
import { login } from './login';

dotenvConfig();

//main
(async () => {
    try {
        const initialUrl = process.env.INITIAL_URL;
        if (!initialUrl) {
            throw new Error("INITIAL_URL is not set in environment variables");
        }

        const { browser, page } = await initialize(initialUrl);
        const ebookIndexPage: Page = await login(page);
        console.log(ebookIndexPage.url());

        let format: EBookFormat | null = null;
        // 特定のJSONリクエストを監視する
        ebookIndexPage.route('**/*bookinfo.json', async (route, request) => {
            format = await interceptJsonRequest(route, request); // 戻り値を取得
        });
        if (format !== null) {
            // ここでformatを使用する
            console.log(`Obtained Format: ${EBookFormat[format]}`);
        }

        // Close browser or any other cleanup operations
    } catch (err) {
        console.error("An error occurred:", err);
        // Handle error and cleanup resources
    }
})();
