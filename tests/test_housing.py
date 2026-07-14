import pytest
from selenium.webdriver.common.by import By
import time

def test_housing_service(driver, base_url):
    print(f"Starting Housing Service Test...")
    
    driver.get(f"{base_url}/citizen")
    time.sleep(2)

    assert "housing" in driver.current_url.lower() or "housing" in driver.page_source.lower()
    print(f"Housing Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
