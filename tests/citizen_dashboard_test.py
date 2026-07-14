import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def test_citizen_dashboard_loading(citizen_driver, base_url):
    print(f"Starting Citizen Test...")
    
    wait = WebDriverWait(citizen_driver, 30)
    

    
    # Open Dashboard
    citizen_driver.get(f"{base_url}/citizen")
    
    # Validate Dashboard
    wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
    
    current_url = citizen_driver.current_url.lower()
    page_text = citizen_driver.find_element(By.TAG_NAME, "body").text.lower()
    
    assert "citizen" in current_url or "dashboard" in page_text or "welcome" in page_text
    print(f"Citizen Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
