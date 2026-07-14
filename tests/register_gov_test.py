import pytest
from selenium.webdriver.common.by import By
import time
import random

def test_gov_registration(driver, base_url):
    print(f"Starting Registration Test...")
    
    driver.get(f"{base_url}/government/government_register")
    time.sleep(2)

    # Dynamic Test Data
    rand = random.randint(1000, 9999)
    email = f"gov{rand}@gmail.com"
    password = "Gov@123"

    # Fill Form
    driver.find_element(By.NAME, "email").send_keys(email)
    driver.find_element(By.NAME, "password").send_keys(password)
    driver.find_element(By.NAME, "confirm_password").send_keys(password)

    # Submit Form
    driver.find_element(By.TAG_NAME, "button").click()
    time.sleep(3)

    # Check Result
    current_url = driver.current_url.lower()
    page_text = driver.find_element(By.TAG_NAME, "body").text.lower()

    assert ("login" in current_url or "success" in page_text)
    print(f"Registration Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
