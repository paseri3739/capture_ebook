import { Browser, Page, Target } from 'puppeteer';
import { switchToLastTab } from './switch_to_last_tab';

async function login(page: Page, browser: Browser): Promise<Page> {
    await page.type('#usrcardnumber', process.env.USER_NAME!);
    await page.click('#password');
    await page.type('#password', process.env.PASSWORD!);
    await page.waitForTimeout(1000);
    await page.click('.exec');

    await page.waitForTimeout(1000);

    // 新しいタブが開くのを待つ
    const newPagePromise = new Promise<Page>((resolve, reject) =>
        browser.once('targetcreated', async (target: Target) => {
            const newPage = await target.page();
            if (newPage !== null) {
                resolve(newPage);
            } else {
                reject(new Error('New page is null'));
            }
        })
    );


    // XPathで特定の文字列を含むリンクを探す
    const links = await page.$x('//a[contains(text(), "電子図書館")]');

    // 見つかった最初のリンクをクリック
    if (links.length > 0) {
        await (links[0] as any).click();  // 明示的な型アサーションを使用
    } else {
        console.log("指定した文字列を含むリンクが見つかりませんでした。");
    }

    // 新しいタブが開くのを待つ
    const newPage = await newPagePromise;
    // 最後のタブに切り替えてそのPageオブジェクトを取得
    const lastPage = await switchToLastTab(browser);
    await lastPage.bringToFront();
    console.log(await lastPage.url());

    return lastPage;

}

export { login };
