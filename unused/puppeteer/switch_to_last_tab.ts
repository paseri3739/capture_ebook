import { Browser, Page } from 'puppeteer';

export const switchToLastTab = async (browser: Browser): Promise<Page> => {
    const pages = await browser.pages();
    const lastPage = pages[pages.length - 1];
    return lastPage;
};
