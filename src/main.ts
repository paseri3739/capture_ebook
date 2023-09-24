import { config as dotenvConfig } from 'dotenv';
import { Page } from 'playwright';
import { initialize } from './initialize';
import { interceptJsonRequest } from './intercept_json_request';
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

        // 特定のJSONリクエストをインターセプト
        ebookIndexPage.route('**/*bookinfo.json', interceptJsonRequest);

        // 何かしらのアクションをトリガーして、bookinfo.jsonにリクエストする必要があります
        // 例: ebookIndexPage.click('selector');

        // Close browser or any other cleanup operations
    } catch (err) {
        console.error("An error occurred:", err);
        // Handle error and cleanup resources
    }
})();
