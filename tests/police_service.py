import pytest
from selenium.webdriver.common.by import By
import time

def test_police_service(government_driver, base_url):
    print(f"Starting Police Service Test...")
    
    government_driver.get(f"{base_url}/government")
    time.sleep(2)

    assert "police" in government_driver.current_url.lower() or "police" in government_driver.page_source.lower()
    print(f"Police Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
