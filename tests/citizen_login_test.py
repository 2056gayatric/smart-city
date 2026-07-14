import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_user_login(driver, base_url):
    print(f"Starting Citizen Test...")
    
    driver.get(f"{base_url}/login")
    wait = WebDriverWait(driver, 10)

    # Wait for login form
    wait.until(EC.presence_of_element_located((By.NAME, "email")))

    # Enter credentials
    driver.find_element(By.NAME, "email").send_keys("admin@gmail.com")  
    driver.find_element(By.NAME, "password").send_keys("Test@123")

    # Click login
    login_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
    driver.execute_script("arguments[0].scrollIntoView(true);", login_btn)
    driver.execute_script("arguments[0].click();", login_btn)

    # Wait for page load
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    current_url = driver.current_url.lower()
    page_text = driver.find_element(By.TAG_NAME, "body").text.lower()

    # Success conditions
    assert ("/citizen" in current_url or 
            "dashboard" in current_url or 
            "welcome" in page_text or 
            "logout" in page_text)
    
    assert "invalid" not in page_text
    assert "error" not in page_text
    print(f"Citizen Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
