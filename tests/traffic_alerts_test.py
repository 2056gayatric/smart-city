from selenium.webdriver.common.by import By
import time
import pytest

def test_traffic_alerts_visibility(driver, base_url):
    print(f"Starting Alert Test...")
    print("\nStarting Traffic Alerts Visibility Test...")
    
    # Step 1: Login
    print(" Logging in as admin...")
    driver.get(f"{base_url}/login")
    time.sleep(2)

    driver.find_element(By.NAME, "email").send_keys("admin@gmail.com")
    driver.find_element(By.NAME, "password").send_keys("Test@123")
    driver.find_element(By.XPATH, "//button[contains(text(),'Login')]").click()
    time.sleep(3)
    print("Login successful")

    # Step 2: Open Dashboard
    print(" Navigating to Traffic Alerts page...")
    driver.get(f"{base_url}/citizen/alerts/traffic")
    time.sleep(2)

    # Step 3: Check Traffic Alerts Section
    print(" Checking for 'traffic' content...")
    page_text = driver.find_element(By.TAG_NAME, "body").text.lower()
    
    assert "traffic" in page_text
    print("Traffic Alerts section is visible")

    # Step 4 (Optional): Click Traffic Alerts
    try:
        traffic_elem = driver.find_element(By.XPATH, "//*[contains(text(),'Traffic')]")
        traffic_elem.click()
        time.sleep(2)
        print("Clicked on Traffic element")
    except:
        print("ℹ️ No clickable Traffic Alerts button found (skipping optional step)")

    print("⭐ Traffic Alerts Visibility Test PASSED")
    print(f"Alert Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
