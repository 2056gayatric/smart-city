import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_electricity_complaint_submission(citizen_driver, base_url):
    print(f"Starting Complaint Test...")
    
    wait = WebDriverWait(citizen_driver, 10)


    # Open Electricity Complaint Page
    citizen_driver.get(f"{base_url}/citizen/complaints/electricity")
    time.sleep(3)

    # Consumer Details
    citizen_driver.find_element(By.NAME, "consumer[fullName]").send_keys("Test User")
    citizen_driver.find_element(By.NAME, "consumer[serviceNumber]").send_keys("SRV12345")
    citizen_driver.find_element(By.NAME, "consumer[meterNumber]").send_keys("MTR98765")
    citizen_driver.find_element(By.NAME, "consumer[phone]").send_keys("9876543210")
    citizen_driver.find_element(By.NAME, "consumer[email]").send_keys("testuser@gmail.com")

    # Connection Type
    elem1 = citizen_driver.find_element(By.XPATH, "//div[contains(text(),'Commercial')]")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem1)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem1)
    time.sleep(1)

    # Provider
    elem2 = citizen_driver.find_element(By.XPATH, "//div[contains(text(),'BESCOM')]")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem2)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem2)
    time.sleep(1)

    # Address Details
    citizen_driver.find_element(By.NAME, "address[addressLine]").send_keys("House 101, MG Road")
    citizen_driver.find_element(By.NAME, "address[landmark]").send_keys("Near Temple")
    citizen_driver.find_element(By.NAME, "address[area]").send_keys("City Center")
    citizen_driver.find_element(By.NAME, "address[city]").send_keys("Ahmedabad")
    citizen_driver.find_element(By.NAME, "address[ward]").send_keys("Ward 1")

    # Issue Type
    elem3 = citizen_driver.find_element(By.XPATH, "//div[contains(text(),'Power Cut')]")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", elem3)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", elem3)
    time.sleep(1)

    # Issue Date & Time
    citizen_driver.find_element(By.NAME, "issue[issueDate]").send_keys("2026-04-13")
    citizen_driver.find_element(By.NAME, "issue[issueTime]").send_keys("10:30")

    # Duration
    citizen_driver.find_element(By.NAME, "issue[duration]").send_keys("1_4_hours")

    # Description
    citizen_driver.find_element(By.NAME, "issue[description]").send_keys("Power cut in our area since morning. No electricity.")

    # Submit Form
    submit_btn = citizen_driver.find_element(By.ID, "submitBtn")
    citizen_driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant', block: 'center'});", submit_btn)
    time.sleep(0.5)
    citizen_driver.execute_script("arguments[0].click();", submit_btn)
    time.sleep(5)

    # Check Success Modal
    modal = citizen_driver.find_element(By.ID, "successModal")
    assert modal.is_displayed()
    print(f"Complaint Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
