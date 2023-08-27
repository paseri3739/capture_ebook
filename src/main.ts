import { config as dotenvConfig } from 'dotenv';
import { initialize } from './initialize';
import { interactWithConsole } from './interactWithConsole';
import { login } from './login';
import { monitorURLChanges } from './monitorURLChanges';
import { observeDOMChanges } from './observe_dom_changes';

dotenvConfig();

//main
(async () => {
    try {
        const initialUrl = process.env.INITIAL_URL;
        if (!initialUrl) {
            throw new Error("INITIAL_URL is not set in environment variables");
        }

        const { browser, page } = await initialize(initialUrl);
        const newPage = await login(page, browser);

        await observeDOMChanges(newPage);
        await monitorURLChanges(newPage);
        await interactWithConsole(newPage, browser);

        // Close browser or any other cleanup operations
    } catch (err) {
        console.error("An error occurred:", err);
        // Handle error and cleanup resources
    }
})();
