const puppeteer = require("puppeteer");
// index.ts or app.ts
import dotenv from 'dotenv';

// dotenv の設定を読み込む
dotenv.config();

(async () => {
    const initialUrl = process.env.INITIAL_URL
    console.log(initialUrl)
    // ブラウザを開く
    const browser = await puppeteer.launch({ headless: false });  // headlessをfalseにしてUIを見ながら操作できるようにする
    const page = await browser.newPage();

    // 手動でログインやCAPTCHA解決をするために、一時停止（例として30秒）
    console.log("Please login manually...");
    await page.waitForTimeout(30000);  // 30秒待つ

    // 起点となるURLに遷移
    await page.goto(initialUrl);

    // スクリーンショットを撮るDOM要素を選択
    const element = await page.$('#targetElementId'); // CSSセレクタを使用して要素を選択

    // スクリーンショットを撮る
    if (element) {
        await element.screenshot({ path: 'screenshot.png' });
    }

    // キーボードイベントを送信（ここでは 'Enter' キー）
    await page.keyboard.press('Enter');

    // 続けて他の処理を書くことができます

    // ブラウザを閉じる（必要に応じて）
    await browser.close();
})();
