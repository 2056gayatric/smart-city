import pytest
from selenium.webdriver.common.by import By
import time

def test_metro_service(transport_driver, base_url):
    print(f"Starting Metro Transport Test...")
    
    transport_driver.get(f"{base_url}/transport")
    time.sleep(2)

    assert "metro" in transport_driver.current_url.lower() or "metro" in transport_driver.page_source.lower()
    print(f"Metro Transport Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
