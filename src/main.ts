import { config as dotenvConfig } from 'dotenv';
import { initialize } from './initialize';
import { login } from './login';
import { loopQuestion } from './loop_question';

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;

    const { browser, page } = await initialize(initialUrl);

    // ここで login 関数を呼び出す
    await login(page, browser);
    console.log("Please complete the manual step and then press Enter.");

    loopQuestion(page);

})();
