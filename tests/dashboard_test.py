import pytest
from selenium.webdriver.common.by import By
import time

def test_home_page_loading(driver, base_url):
    print(f"Starting Test Test...")
    
    driver.get(base_url)
    time.sleep(2)

    assert driver.current_url.rstrip('/') == base_url.rstrip('/')
    body = driver.find_element(By.TAG_NAME, "body")
    assert body is not None
    print(f"Test Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
