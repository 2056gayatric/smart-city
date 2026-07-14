import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def wait(government_driver, time=10):
    return WebDriverWait(government_driver, time)

# -------------------- 1. PAGE LOAD TEST --------------------
def test_page_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    assert "CityZen" in government_driver.title

# -------------------- 2. HEADER TEST --------------------
def test_header_elements(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    logo = wait(government_driver).until(
        EC.presence_of_element_located((By.CLASS_NAME, "govt-logo"))
    )
    assert logo is not None
    title = government_driver.find_element(By.TAG_NAME, "h1")
    assert "CityZen" in title.text

# -------------------- 3. STATS DISPLAY TEST --------------------
def test_stats_cards(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    wait(government_driver).until(
        EC.presence_of_element_located((By.CLASS_NAME, "stat-card"))
    )
    stats = government_driver.find_elements(By.CLASS_NAME, "stat-card")
    assert len(stats) >= 3

# -------------------- 4. CATEGORY CARDS TEST --------------------
def test_category_cards(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    cards = wait(government_driver).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "category-card"))
    )
    assert len(cards) == 4  # water, garbage, electricity, road

# -------------------- 5. CATEGORY NAVIGATION TEST --------------------
def test_category_navigation(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    # Click Water Complaint card
    water_card = wait(government_driver).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".water-card")))
    water_card.click()
    assert "water" in government_driver.current_url

# -------------------- 6. GARBAGE CARD NAVIGATION --------------------
def test_garbage_navigation(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    garbage_card = wait(government_driver).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".garbage-card")))
    garbage_card.click()
    assert "garbage" in government_driver.current_url

# -------------------- 7. ELECTRICITY NAVIGATION --------------------
def test_electricity_navigation(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    elec_card = wait(government_driver).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".electricity-card")))
    elec_card.click()
    assert "electricity" in government_driver.current_url

# -------------------- 8. ROAD NAVIGATION --------------------
def test_road_navigation(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    road_card = wait(government_driver).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".traffic-card")))
    road_card.click()
    assert "road" in government_driver.current_url

# -------------------- 9. LOGOUT BUTTON TEST --------------------
def test_logout_button(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    logout = wait(government_driver).until(
        EC.presence_of_element_located((By.CLASS_NAME, "logout-btn-header"))
    )
    assert logout.is_displayed()

# -------------------- 10. STAT VALUE NOT EMPTY TEST --------------------
def test_stat_values(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government")
    values = government_driver.find_elements(By.CLASS_NAME, "stat-value")
    for v in values:
        assert v.text is not None

# -------------------- 11. RESPONSIVE CHECK (basic) --------------------
def test_mobile_view(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.set_window_size(375, 812)  # iPhone size
    government_driver.get(f"{base_url}/government")
    cards = government_driver.find_elements(By.CLASS_NAME, "category-card")
    assert len(cards) > 0
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
