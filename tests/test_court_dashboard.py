import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_admin_court_dashboard(court_driver, base_url):
    print(f"Starting Court Test...")
    
    court_driver.get(f"{base_url}/court")
    time.sleep(2)

    assert "court" in court_driver.page_source.lower()
    print(f"Court Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
