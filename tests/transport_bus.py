import pytest
from selenium.webdriver.common.by import By
import time

def test_admin_bus_dashboard(transport_driver, base_url):
    print(f"Starting Bus Transport Test...")
    
    transport_driver.get(base_url)
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-login").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "admin-bus").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "add-route").click()
    time.sleep(2)

    transport_driver.find_element(By.ID, "route-name").send_keys("Bus Route A")
    transport_driver.find_element(By.ID, "submit-route").click()

    time.sleep(2)

    assert "bus" in transport_driver.page_source.lower()
    print(f"Bus Transport Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
