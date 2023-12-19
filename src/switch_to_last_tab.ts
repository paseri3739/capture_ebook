import { Browser, BrowserContext, Page } from "playwright";

export const switchToLastTab = async (browser: Browser): Promise<Page | null> => {
    const contexts = browser.contexts();
    if (contexts.length === 0) {
        return null;
    }

    const context: BrowserContext = contexts[0];
    const pages = context.pages();
    const lastPage = pages[pages.length - 1];

    return lastPage;
};
