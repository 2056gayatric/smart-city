import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

def test_garbage_complaint_submission(citizen_driver, base_url):
    print(f"Starting Complaint Test...")
    
    wait = WebDriverWait(citizen_driver, 10)


    # Open Garbage Complaint Page
    citizen_driver.get(f"{base_url}/citizen/complaints/garbage")
    time.sleep(3)

    # Location Details
    citizen_driver.find_element(By.NAME, "street").send_keys("MG Road")
    citizen_driver.find_element(By.NAME, "city").send_keys("Ahmedabad")
    citizen_driver.find_element(By.NAME, "zipCode").send_keys("380001")
    Select(citizen_driver.find_element(By.NAME, "ward")).select_by_visible_text("Ward 1")
    citizen_driver.find_element(By.NAME, "details").send_keys("Garbage is dumped near the corner of the street.")

    # Garbage Type
    elem1 = citizen_driver.find_element(By.XPATH, "//div[@data-type='plastic']")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem1)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem1)
    time.sleep(1)

    # Quantity
    elem2 = citizen_driver.find_element(By.XPATH, "//div[@data-quantity='large']")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem2)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem2)
    time.sleep(1)

    # Duration
    Select(citizen_driver.find_element(By.NAME, "duration")).select_by_visible_text("3 Days")

    # Issue Type
    elem3 = citizen_driver.find_element(By.XPATH, "//div[@data-issue='illegal']")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem3)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem3)
    time.sleep(1)

    # Description
    citizen_driver.find_element(By.NAME, "description").send_keys("Large amount of plastic waste dumped illegally on roadside.")

    # Photo Date & Time
    citizen_driver.find_element(By.NAME, "photoDate").send_keys("2026-04-13")
    citizen_driver.find_element(By.NAME, "photoTime").send_keys("10:30")

    # Contact Info
    citizen_driver.find_element(By.NAME, "fullName").send_keys("Test User")
    citizen_driver.find_element(By.NAME, "phone").send_keys("9876543210")
    citizen_driver.find_element(By.NAME, "email").send_keys("testuser@gmail.com")

    # Submit Form
    submit_btn = citizen_driver.find_element(By.ID, "submitBtn")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", submit_btn)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", submit_btn)
    time.sleep(5)

    # Check Success Modal
    success_modal = citizen_driver.find_element(By.ID, "successModal")
    assert success_modal is not None
    print(f"Complaint Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
