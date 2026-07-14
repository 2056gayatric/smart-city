import pytest
from selenium.webdriver.common.by import By
import time
import random

def test_hospital_registration(hospital_driver, base_url):
    print(f"Starting Hospital Test...")
    
    hospital_driver.get(f"{base_url}/hospital/hospital_register")
    time.sleep(2)

    # Dynamic Data
    rand = random.randint(1000, 9999)
    email = f"hospital{rand}@gmail.com"
    password = "Hosp@123"

    # Fill Form
    hospital_driver.find_element(By.NAME, "email").send_keys(email)
    hospital_driver.find_element(By.NAME, "password").send_keys(password)
    hospital_driver.find_element(By.NAME, "confirm_password").send_keys(password)

    # Submit Form
    hospital_driver.find_element(By.TAG_NAME, "button").click()
    time.sleep(3)

    # Check Result
    current_url = hospital_driver.current_url.lower()
    page_text = hospital_driver.find_element(By.TAG_NAME, "body").text.lower()

    assert ("login" in current_url or "success" in page_text)
    print(f"Hospital Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
