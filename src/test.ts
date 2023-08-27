import { chromium, ChromiumBrowser, Page, Request } from 'playwright';

let browser: ChromiumBrowser;
let page: Page;

async function interceptJsonRequest(request: Request) {
    // 特定のJSONファイル（bookinfo.json）のリクエストを監視
    if (request.url().endsWith('bookinfo.json')) {
        const response = await request.response();
        if (response) {
            const bookInfo = await response.json();
            // "format"フィールドを抽出
            console.log(`Format: ${bookInfo.contentInformation.format}`);
        }
    }
}

async function main() {
    browser = await chromium.launch();
    page = await browser.newPage();

    // リクエストを監視する設定
    page.on('request', interceptJsonRequest);

    // SPAのページに遷移
    await page.goto('https://example.com'); // 実際のウェブサイトURLに置き換えてください

    // その他の操作（例：ボタンクリックやフォームの入力）が必要な場合はここで行う
}

main().catch(console.error);
