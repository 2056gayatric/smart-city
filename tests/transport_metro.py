import pytest
from selenium.webdriver.common.by import By
import time

def test_admin_metro_dashboard(transport_driver, base_url):
    print(f"Starting Metro Transport Test...")
    
    transport_driver.get(base_url)
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-login").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-metro").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "add-station").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "station-name").send_keys("Metro Station A")
    transport_driver.find_element(By.ID, "submit-station").click()

    time.sleep(2)

    assert "metro" in transport_driver.page_source.lower()
    print(f"Metro Transport Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
