import pytest
from selenium.webdriver.common.by import By
import time

def test_park_facility(driver, base_url):
    print(f"Starting Park Service Test...")
    
    driver.get(base_url)
    time.sleep(2)

    park_btn = driver.find_element(By.ID, "park")
    park_btn.click()

    time.sleep(2)

    assert "park" in driver.current_url.lower() or "park" in driver.page_source.lower()
    print(f"Park Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
