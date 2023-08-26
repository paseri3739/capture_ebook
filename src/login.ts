import { Browser, Page } from 'puppeteer';

async function login(page: Page, browser: Browser): Promise<void> {
    await page.type('#usrcardnumber', process.env.USER_NAME!);
    await page.click('#password');
    await page.type('#password', process.env.PASSWORD!);
    await page.waitForTimeout(1000);
    await page.click('.exec');

    await page.waitForTimeout(1000);
    // XPathで特定の文字列を含むリンクを探す
    const links = await page.$x('//a[contains(text(), "電子図書館")]');

    // 見つかった最初のリンクをクリック
    if (links.length > 0) {
        await (links[0] as any).click();  // 明示的な型アサーションを使用
    } else {
        console.log("指定した文字列を含むリンクが見つかりませんでした。");
    }


}

export { login };
