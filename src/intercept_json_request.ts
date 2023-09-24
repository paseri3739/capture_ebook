import { ChromiumBrowser, Page, Request } from 'playwright';

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

export { interceptJsonRequest };

