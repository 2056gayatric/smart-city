import pytest
from selenium.webdriver.common.by import By
import time

def test_ground_service(driver, base_url):
    print(f"Starting Ground Service Test...")
    
    driver.get(f"{base_url}/citizen")
    time.sleep(2)

    assert "ground" in driver.current_url.lower() or "ground" in driver.page_source.lower()
    print(f"Ground Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
