import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()

USER_NAME = os.getenv("USER_NAME")
PASSWORD = os.getenv("PASSWORD")
INITIAL_PAGE = os.getenv("INITIAL_PAGE")
INFORMATION_URL = "https://kinoden.kinokuniya.co.jp/tosyokan.pref.shizuoka/bookdetail/p/"


class EBookScraper:
    @classmethod
    def initialize(cls):
        cls.driver = webdriver.Firefox()

    @classmethod
    def close_driver(cls):
        cls.driver.quit()

    @classmethod
    def sign_in(cls):
        cls.driver.get(INITIAL_PAGE)
        cls.driver.set_window_size(1440, 900)
        cls.driver.find_element(By.ID, "usrcardnumber").send_keys(USER_NAME)
        cls.driver.find_element(By.ID, "password").click()
        cls.driver.find_element(By.ID, "password").send_keys(PASSWORD)
        cls.driver.find_element(By.CSS_SELECTOR, ".exec").click()

        # 現在のタブのハンドルを取得
        current_handle = cls.driver.current_window_handle
        cls.driver.find_element(By.LINK_TEXT, "電子図書館").click()
        # 新しいタブのハンドルを取得するための待機処理（適切な待機時間を設定すること）
        time.sleep(2)

        # すべてのタブのハンドルを取得
        all_handles = cls.driver.window_handles

        # 新しいタブのハンドルにスイッチ
        for handle in all_handles:
            if handle != current_handle:
                cls.driver.switch_to.window(handle)
                break

    @classmethod
    def get_ebook_type(cls) -> str:
        while True:
            try:
                second_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[2]/span[1]"
                break
            except:
                time.sleep(3)

        second_div_text = cls.driver.find_element(By.XPATH, second_xpath).text
        print(second_div_text)

        ebooktype_xpath = None
        if second_div_text == "NDC:":  # eISBNがないのでXPATHがずれる
            ebooktype_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[4]/span[2]"
        else:
            ebooktype_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[5]/span[2]"

        format_info_element = cls.driver.find_element(By.XPATH, ebooktype_xpath)
        format_info_text: str = format_info_element.text
        return format_info_text

    @classmethod
    def scrape_epub(cls):
        pass

    @classmethod
    def scrape_pdf(cls):
        pass

    @classmethod
    def start_scraping(cls):
        cls.sign_in()
        try:
            while True:
                current_url = cls.driver.current_url
                if INFORMATION_URL in current_url:
                    print(cls.get_ebook_type())
                time.sleep(3)
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    EBookScraper.initialize()
    EBookScraper.start_scraping()
    EBookScraper.close_driver()


# epubContent(普通のイメージのページ)
# imageContents(表紙とか、HTMLで制御されていない自炊系の電子書籍) -> 形式: PDFになっている
# screenDiv(画面全体、見開き範囲外まで)
# class pageContainer(htmlのとき、見開き)
# スペースバー押下1回でUIが隠れる
# 書籍情報に形式:EPUBとあるものはHTMLで記述されている -> 形式を検知し、それに応じたスクレイピングを行う
# 形式: PDF 普通にスクレイピング可能
