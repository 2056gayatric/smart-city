import pytest
from selenium.webdriver.common.by import By
import time

def test_hospital_dashboard(hospital_driver, base_url):
    print(f"Starting Hospital Test...")
    
    hospital_driver.get(f"{base_url}/hospital")
    time.sleep(2)

    assert "hospital" in hospital_driver.current_url.lower() or "hospital" in hospital_driver.page_source.lower()
    print(f"Hospital Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
