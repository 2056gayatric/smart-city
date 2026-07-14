import pytest
from selenium.webdriver.common.by import By
import time
import random

def test_transport_registration(transport_driver, base_url):
    print(f"Starting Registration Test...")
    
    transport_driver.get(f"{base_url}/transport/transpose_register")
    time.sleep(2)

    # Dynamic Test Data
    rand = random.randint(1000, 9999)
    email = f"transport{rand}@gmail.com"
    password = "Trans@123"

    # Fill Form
    transport_driver.find_element(By.NAME, "email").send_keys(email)
    transport_driver.find_element(By.NAME, "password").send_keys(password)
    transport_driver.find_element(By.NAME, "confirm_password").send_keys(password)

    # Submit Form
    transport_driver.find_element(By.TAG_NAME, "button").click()
    time.sleep(3)

    # Check Result
    current_url = transport_driver.current_url.lower()
    page_text = transport_driver.find_element(By.TAG_NAME, "body").text.lower()

    assert ("login" in current_url or "success" in page_text)
    print(f"Registration Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
