import { Request, Route } from 'playwright';

enum EBookFormat {
    "PDF" = 1,
    "EPUB" = 2,
    "EPUBFixed-Layout" = 3,
    // その他のフォーマット
}

async function interceptJsonRequest(route: Route, request: Request): Promise<EBookFormat | null> {
    return new Promise(async (resolve) => {
        if (request.url().endsWith('bookinfo.json')) {
            route.continue();
            const response = await request.response();
            if (response) {
                const bookInfo = await response.json();
                const format = bookInfo.contentInformation.format as EBookFormat;
                console.log(`Format: ${EBookFormat[format]}`);
                resolve(format); // ここでEBookFormatを解決
                return;
            }
        }
        route.continue();
        resolve(null); // フォーマットが取得できない場合はnullを解決
    });
}

export { EBookFormat, interceptJsonRequest };

