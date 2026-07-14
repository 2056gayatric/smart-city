import pytest
from selenium.webdriver.common.by import By
import time
import random

def test_court_registration(court_driver, base_url):
    print(f"Starting Court Test...")
    
    court_driver.get(f"{base_url}/court/court_register")
    time.sleep(2)

    # Dynamic Data (to avoid duplicate emails)
    rand = random.randint(1000, 9999)
    email = f"court{rand}@gmail.com"
    password = "Court@123"

    # Fill Form
    court_driver.find_element(By.NAME, "email").send_keys(email)
    court_driver.find_element(By.NAME, "password").send_keys(password)
    court_driver.find_element(By.NAME, "confirm_password").send_keys(password)

    # Submit Form
    court_driver.find_element(By.TAG_NAME, "button").click()
    time.sleep(3)

    # Check Result
    current_url = court_driver.current_url.lower()
    page_text = court_driver.find_element(By.TAG_NAME, "body").text.lower()

    assert ("login" in current_url or "success" in page_text)
    print(f"Court Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
