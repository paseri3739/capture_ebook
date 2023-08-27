import { Page } from 'playwright';

async function findSpanWithPDFOrEPUB(page: Page): Promise<string[]> {
    // すべての span 要素を取得
    const spans = await page.$$('span');

    // 結果を格納する配列
    const result: string[] = [];

    for (const span of spans) {
        // span のテキストを取得
        const text = await span.innerText();

        // テキストに "PDF" または "EPUB" が含まれているかチェック
        if (text.includes('PDF') || text.includes('EPUB')) {
            result.push(text);
        }
    }

    return result;
}


export { findSpanWithPDFOrEPUB };
