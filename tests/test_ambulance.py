import pytest
from selenium.webdriver.common.by import By
import time

def test_ambulance_service(hospital_driver, base_url):
    print(f"Starting Ambulance Service Test...")
    
    hospital_driver.get(f"{base_url}/hospital")
    time.sleep(2)

    assert "ambulance" in hospital_driver.current_url.lower() or "ambulance" in hospital_driver.page_source.lower()
    print(f"Ambulance Service Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
