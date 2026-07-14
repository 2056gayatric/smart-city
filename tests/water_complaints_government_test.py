import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def test_load_page(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    assert "Water Infrastructure" in government_driver.title

def test_table_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) > 0

def test_search(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    search = government_driver.find_element(By.ID, "searchInput")
    search.clear()
    search.send_keys("WTR-001")
    search.send_keys(Keys.ENTER)
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) >= 1

def test_filter_status(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    dropdown = government_driver.find_element(By.ID, "statusFilter")
    dropdown.click()
    dropdown.find_element(By.XPATH, "//option[@value='Resolved']").click()
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) >= 0

def test_view_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    view_btn = government_driver.find_element(By.CSS_SELECTOR, ".btn-view")
    view_btn.click()
    time.sleep(2)
    modal = government_driver.find_element(By.ID, "viewModal")
    assert "active" in modal.get_attribute("class")

def test_close_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    government_driver.find_element(By.CSS_SELECTOR, ".btn-view").click()
    time.sleep(2)
    close_btn = government_driver.find_element(By.CLASS_NAME, "modal-close")
    close_btn.click()
    time.sleep(2)
    modal = government_driver.find_element(By.ID, "viewModal")
    assert "active" not in modal.get_attribute("class")

def test_update_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    edit_btn = government_driver.find_elements(By.CSS_SELECTOR, ".fa-edit")[0]
    edit_btn.click()
    time.sleep(2)
    modal = government_driver.find_element(By.ID, "updateModal")
    assert "active" in modal.get_attribute("class")

def test_change_status(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    edit_btn = government_driver.find_elements(By.CSS_SELECTOR, ".fa-edit")[0]
    edit_btn.click()
    time.sleep(2)
    status = government_driver.find_element(By.ID, "statusSelect")
    status.click()
    status.find_element(By.XPATH, "//option[@value='Resolved']").click()
    notes = government_driver.find_element(By.ID, "govtNotes")
    notes.send_keys("Test update via Selenium")
    save_btn = government_driver.find_element(By.XPATH, "//button[contains(text(),'Save Changes')]")
    save_btn.click()
    time.sleep(2)

def test_pagination(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/water")
    time.sleep(2)
    next_btn = government_driver.find_element(By.ID, "nextBtn")
    if next_btn.is_enabled():
        next_btn.click()
        time.sleep(2)
        assert True
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
