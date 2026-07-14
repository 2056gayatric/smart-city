import pytest
from selenium.webdriver.common.by import By
import time

def test_bus_service(transport_driver, base_url):
    print(f"Starting Bus Transport Test...")
    
    transport_driver.get(f"{base_url}/transport")
    time.sleep(2)

    assert "bus" in transport_driver.current_url.lower() or "bus" in transport_driver.page_source.lower()
    print(f"Bus Transport Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
