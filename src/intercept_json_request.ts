import { Request, Route } from 'playwright';

async function interceptJsonRequest(route: Route, request: Request) {
    if (request.url().endsWith('bookinfo.json')) {
        // リクエストを続行し、レスポンスを待ちます。
        route.continue();
        const response = await request.response();

        if (response) {
            const bookInfo = await response.json();
            console.log(`Format: ${bookInfo.contentInformation.format}`);
        }
    } else {
        route.continue();
    }
}


export { interceptJsonRequest };
