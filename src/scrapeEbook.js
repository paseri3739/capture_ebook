const puppeteer = require("puppeteer");
const readline = require("readline");
require('dotenv').config();

(async () => {
    const initialUrl = process.env.INITIAL_URL;
    console.log(initialUrl);

    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(initialUrl, { waitUntil: 'load' });

    // 手動操作を待機する
    console.log("Please complete the manual step and then press Enter.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Press Enter when done.', async (answer) => {
        rl.close();
        // 手動操作が完了した後に行う処理
        await page.evaluate(() => {
            window.alert("enter_pressed");
        });

        // ブラウザを閉じる（必要に応じて）
        await browser.close();
        process.exit();
    });
})();
