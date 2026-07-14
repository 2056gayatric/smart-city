import os
from selenium import webdriver
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.chrome.options import Options as ChromeOptions
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.chrome.service import Service as ChromeService

BASE_URL = os.environ.get("BASE_URL", "http://localhost:3070")

def GET_DRIVER(browser="chrome", headless=False):
    """
    Helper to get a configured webdriver.
    Defaults to Edge as it is standard on Windows.
    Falls back to system-installed drivers if webdriver-manager fails.
    """
    if browser.lower() == "edge":
        options = EdgeOptions()
        if headless:
            options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        
        try:
            service = EdgeService(EdgeChromiumDriverManager().install())
        except Exception as e:
            print(f"⚠️ Webdriver-manager failed: {e}. Falling back to system msedgedriver.")
            service = EdgeService() # Uses driver in PATH
            
        return webdriver.Edge(service=service, options=options)
    else:
        options = ChromeOptions()
        if headless:
            options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        
        try:
            service = ChromeService(ChromeDriverManager().install())
        except Exception as e:
            print(f"⚠️ Webdriver-manager failed: {e}. Falling back to system chromedriver.")
            service = ChromeService() # Uses driver in PATH
            
        return webdriver.Chrome(service=service, options=options)

CREDENTIAL_MAP = {
    "citizen": {
        "email": "admin@gmail.com",
        "password": "Test@123"
    },
    "government": {
        "email": "gov8517@gmail.com",
        "password": "Gov@123"
    },
    "hospital": {
        "email": "hospitaluser1",
        "password": "Hosp@123"
    },
    "court": {
        "email": "courtuser1",
        "password": "Court@123"
    },
    "transport": {
        "email": "trans8517@gmail.com",
        "password": "Trans@123"
    }
}
