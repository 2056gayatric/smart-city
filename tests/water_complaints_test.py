import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

def test_water_complaint_submission(citizen_driver, base_url):
    print(f"Starting Complaint Test...")
    
    wait = WebDriverWait(citizen_driver, 10)


    # Step 2: Open Water Complaint Page
    citizen_driver.get(f"{base_url}/citizen/complaints/water")
    time.sleep(3)

    # Location Details
    citizen_driver.find_element(By.NAME, "address[houseNo]").send_keys("101")
    citizen_driver.find_element(By.NAME, "address[street]").send_keys("MG Road")
    Select(citizen_driver.find_element(By.NAME, "address[ward]")).select_by_visible_text("Ward 1")
    citizen_driver.find_element(By.NAME, "address[pincode]").send_keys("416701")
    citizen_driver.find_element(By.NAME, "address[landmark]").send_keys("Near Temple")

    # Issue Type
    citizen_driver.find_element(By.XPATH, "//div[contains(text(),'Water Leakage')]").click()
    time.sleep(1)

    # Duration
    Select(citizen_driver.find_element(By.NAME, "duration")).select_by_visible_text("1-2 days")

    # Description
    citizen_driver.find_element(By.NAME, "description").send_keys("There is continuous water leakage in our street.")

    # Date & Time
    citizen_driver.find_element(By.NAME, "issueDate").send_keys("2026-04-13")
    citizen_driver.find_element(By.NAME, "issueTime").send_keys("10:30")

    # Contact Info
    citizen_driver.find_element(By.NAME, "fullName").send_keys("Test User")
    citizen_driver.find_element(By.NAME, "phone").send_keys("9876543210")
    citizen_driver.find_element(By.NAME, "email").send_keys("testuser@gmail.com")

    # Submit Form
    citizen_driver.find_element(By.XPATH, "//button[contains(text(),'Submit')]").click()
    time.sleep(5)

    # Check Success
    success_modal = citizen_driver.find_element(By.ID, "successModal")
    assert success_modal.is_displayed()
    print(f"Complaint Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
