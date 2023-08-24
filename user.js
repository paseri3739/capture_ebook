// ==UserScript==
// @name         EBook Type Extractor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Extract ebook type from the page with a floating button
// @author       paseri3739
// @match        https://kinoden.kinokuniya.co.jp/tosyokan.pref.shizuoka/bookdetail/p/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getEbookTypeBySpanText() {
        // "形式" というテキストを含む span 要素を探す
        let xpathForFormat = "//span[contains(text(), '形式')]/following-sibling::span[1]";
        let formatElement = document.evaluate(xpathForFormat, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (formatElement) {
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


    // フローティングボタンを作成
    const floatingButton = document.createElement('button');
    floatingButton.textContent = 'eBookタイプを取得';
    floatingButton.style.position = 'fixed';
    floatingButton.style.bottom = '10px';
    floatingButton.style.right = '10px';
    floatingButton.style.zIndex = '9999';
    floatingButton.style.background = '#4CAF50';
    floatingButton.style.color = 'white';
    floatingButton.style.border = 'none';
    floatingButton.style.padding = '10px 20px';
    floatingButton.style.borderRadius = '5px';
    floatingButton.style.cursor = 'pointer';

    // ボタンのクリックイベントを追加
    floatingButton.onclick = function () {
        alert(getEbookTypeBySpanText());
    };

    document.body.appendChild(floatingButton);

})();
