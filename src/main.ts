import { config as dotenvConfig } from "dotenv";
import { initialize } from "./initialize";
import { login } from "./login";
import { loopQuestion } from "./loop_question";

dotenvConfig();

(async () => {
    const initialUrl = process.env.INITIAL_URL as string;

    const { browser, page } = await initialize(initialUrl);

    const context = await browser.newContext();
    const newPage = await login(page, browser);
    await loopQuestion(newPage);
})();
