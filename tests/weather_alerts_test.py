import pytest
from selenium.webdriver.common.by import By
import time

def test_weather_alerts_visibility(driver, base_url):
    print(f"Starting Alert Test...")
    
    # Step 1: Login
    driver.get(f"{base_url}/login")
    time.sleep(2)

    driver.find_element(By.NAME, "email").send_keys("admin@gmail.com")
    driver.find_element(By.NAME, "password").send_keys("Test@123")
    driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()
    time.sleep(3)

    # Step 2: Open Dashboard
    driver.get(f"{base_url}/citizen/alerts/weather")
    time.sleep(2)

    # Step 3: Check Weather Alerts Section
    page_text = driver.find_element(By.TAG_NAME, "body").text.lower()
    assert "weather" in page_text

    # Step 4 (Optional): Click Weather Alerts
    try:
        weather_elem = driver.find_element(By.XPATH, "//*[contains(text(),'Weather')]")
        weather_elem.click()
        time.sleep(2)
    except:
        pass
    print(f"Alert Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
