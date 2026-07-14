import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import time

def test_user_registration(driver, base_url):
    print(f"Starting Registration Test...")
    
    driver.get(f"{base_url}/citizen/citizen_register")
    wait = WebDriverWait(driver, 10)
    rand = random.randint(1000, 9999)

    # Wait for form
    wait.until(EC.presence_of_element_located((By.ID, "firstName")))

    # Fill form
    driver.find_element(By.ID, "firstName").send_keys("Anushka")
    driver.find_element(By.ID, "lastName").send_keys("Wagh")
    driver.find_element(By.ID, "username").send_keys(f"user{rand}")
    driver.find_element(By.ID, "email").send_keys(f"user{rand}@gmail.com")
    driver.find_element(By.NAME, "phone_number").send_keys(f"98765{rand}")
    driver.find_element(By.ID, "female").click()
    driver.find_element(By.ID, "city").send_keys("Mumbai")
    driver.find_element(By.ID, "password").send_keys("Test@123")
    driver.find_element(By.ID, "confirmPassword").send_keys("Test@123")

    # Scroll to and click checkbox
    checkbox = driver.find_element(By.ID, "terms")
    driver.execute_script("arguments[0].scrollIntoView(true);", checkbox)
    driver.execute_script("arguments[0].click();", checkbox)

    # Scroll to and click submit
    button = driver.find_element(By.XPATH, "//button[@type='submit']")
    driver.execute_script("arguments[0].scrollIntoView(true);", button)
    wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
    button.click()

    # Wait for response
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    current_url = driver.current_url.lower()
    page_text = driver.find_element(By.TAG_NAME, "body").text.lower()

    assert ("login" in current_url or "citizen" in current_url)
    assert "error" not in page_text
    print(f"Registration Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
