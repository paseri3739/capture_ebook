function getEbookType() {
    // "形式:" というテキストを含む span 要素を探す
    let xpathForFormat = "//span[contains(text(), '形式')]/following-sibling::span[1]";
    let formatElement = document.evaluate(xpathForFormat, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (formatElement && formatElement.textContent) {
        // 次の span 要素のテキストを取得
        let formatText = formatElement.textContent.trim();

        // テキストが "PDF" か "EPUB" かを判定
        if (formatText === "PDF") {
            return "PDF";
        }
        if (formatText === "EPUB") {
            return "EPUB";
        }
        return "Unknown Format";
    } else {
        return "Format Element Not Found";
    }
}

export { getEbookType };
