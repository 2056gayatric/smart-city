import pytest
from selenium.webdriver.common.by import By
import time

def test_admin_train_dashboard(transport_driver, base_url):
    print(f"Starting Train Transport Test...")
    
    transport_driver.get(base_url)
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-login").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-train").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "add-platform").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "platform-name").send_keys("Train Platform A")
    transport_driver.find_element(By.ID, "submit-platform").click()

    time.sleep(2)

    assert "train" in transport_driver.page_source.lower()
    print(f"Train Transport Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
