import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class EBookScraper:
    USER_NAME = os.getenv("USER_NAME")
    PASSWORD = os.getenv("PASSWORD")
    INITIAL_PAGE = os.getenv("INITIAL_PAGE")
    INFORMATION_URL = "https://kinoden.kinokuniya.co.jp/tosyokan.pref.shizuoka/bookdetail/p/"

    def __init__(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(10)
        self.current_handles = set(self.driver.window_handles)

    @property
    def current_url(self):
        return self.driver.current_url

    @property
    def actions(self):
        return ActionChains(self.driver)

    def close_driver(self):
        self.driver.quit()

    def switch_to_new_tab(self):
        # Wait until a new tab or popup is opened
        while len(self.driver.window_handles) == len(self.current_handles):
            time.sleep(1)

        new_handles = set(self.driver.window_handles)
        # Get the new handle which is the difference between new handles and current handles
        new_handle = list(new_handles - self.current_handles)[0]

        # Switch to the new handle and update the current_handles
        self.driver.switch_to.window(new_handle)
        self.current_handles = new_handles

    def sign_in(self):
        self.driver.get(self.INITIAL_PAGE)
        self.driver.set_window_size(1440, 900)
        self.driver.find_element(By.ID, "usrcardnumber").send_keys(self.USER_NAME)
        self.driver.find_element(By.ID, "password").click()
        self.driver.find_element(By.ID, "password").send_keys(self.PASSWORD)
        self.driver.find_element(By.CSS_SELECTOR, ".exec").click()

        # 現在のタブのハンドルを取得
        current_handle = self.driver.current_window_handle
        self.driver.find_element(By.LINK_TEXT, "電子図書館").click()
        self.switch_to_new_tab()

    def get_ebook_type(self) -> str:
        while True:
            try:
                second_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[2]/span[1]"
                break
            except:
                time.sleep(3)

        second_div_text = self.driver.find_element(By.XPATH, second_xpath).text

        ebooktype_xpath = None
        if second_div_text == "NDC:":  # eISBNがないのでXPATHがずれる
            ebooktype_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[4]/span[2]"
        else:
            ebooktype_xpath = "/html/body/div[2]/div[3]/div/div/div[2]/div[1]/div[1]/div[3]/div[5]/span[2]"

        format_info_element = self.driver.find_element(By.XPATH, ebooktype_xpath)
        format_info_text: str = format_info_element.text
        return format_info_text

    def is_ui_visible(self) -> bool:
        appbar = self.driver.find_element(By.CSS_SELECTOR, "header.MuiPaper-root:nth-child(1)")
        is_visible = appbar.is_displayed()
        return is_visible

    def hide_ui(self):
        if self.is_ui_visible():
            self.actions.send_keys(Keys.SPACE)

    def scrape_epub(self):
        if self.is_ui_visible():
            self.actions.send_keys(Keys.ARROW_RIGHT)

    def scrape_pdf(self):
        pass

    def main_roop(self):
        self.sign_in()
        try:
            while True:
                if self.INFORMATION_URL in self.current_url:
                    print(self.get_ebook_type())
                time.sleep(3)
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    ebookscraper = EBookScraper()
    ebookscraper.main_roop()
    ebookscraper.close_driver()
