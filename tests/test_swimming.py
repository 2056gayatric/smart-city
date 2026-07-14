import pytest
from selenium.webdriver.common.by import By
import time

def test_swimming_service(driver, base_url):
    print(f"Starting Swimming Service Test...")
    
    driver.get(f"{base_url}/citizen")
    time.sleep(2)

    assert "swimming" in driver.current_url.lower() or "swimming" in driver.page_source.lower()
    print(f"Swimming Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
