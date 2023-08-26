import { config as dotenvConfig } from 'dotenv';
import { initialize } from './initialize';
import { login } from './login';
import { loopQuestion } from './loop_question';

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;

    const { browser, page } = await initialize(initialUrl);

    const context = await browser.newContext();  // BrowserからBrowserContextを取得

    // login関数から新しいPageオブジェクトを取得
    const newPage = await login(page, browser);  // 修正された部分

    // 新しいPageオブジェクトをloopQuestionに渡す
    await loopQuestion(newPage);

})();

