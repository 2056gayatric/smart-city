import pytest
from selenium.webdriver.common.by import By
import time

def test_hospital_login(driver, base_url):
    print(f"Starting Hospital Test...")
    
    driver.get(f"{base_url}/login")
    time.sleep(2)

    # Step 1: Click "Authority"
    driver.find_element(By.XPATH, "//*[text()='Authority']").click()
    time.sleep(1)

    # Step 2: Select "Hospital"
    driver.find_element(By.XPATH, "//*[text()='Hospital']").click()
    time.sleep(1)

    # Step 3: Enter Email / Username
    driver.find_element(By.NAME, "email").send_keys("hospitaluser1")

    # Step 4: Enter Password
    driver.find_element(By.NAME, "password").send_keys("Hosp@123")

    # Step 5: Click Login Button
    driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()
    time.sleep(3)

    # Step 6: Check Success
    assert any(x in driver.current_url.lower() for x in ["dashboard", "government", "hospital", "court", "transport", "citizen"])
    print(f"Hospital Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
