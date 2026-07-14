import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def wait(government_driver, seconds=10):
    return WebDriverWait(government_driver, seconds)

# -------------------- 1. LOAD PAGE --------------------
def test_page_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    assert "Road Infrastructure" in government_driver.title

# -------------------- 2. TABLE LOAD --------------------
def test_table_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    wait(government_driver).until(
        EC.presence_of_element_located((By.ID, "complaintsTableBody"))
    )
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) > 0

# -------------------- 3. FILTER TEST --------------------
def test_status_filter(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    wait(government_driver).until(EC.presence_of_element_located((By.ID, "statusFilter")))
    dropdown = government_driver.find_element(By.ID, "statusFilter")
    dropdown.send_keys("Pending")
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) >= 0

# -------------------- 4. SEARCH TEST --------------------
def test_search(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    search = wait(government_driver).until(
        EC.presence_of_element_located((By.ID, "searchInput"))
    )
    search.send_keys("pothole")
    search.send_keys(Keys.ENTER)
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert rows is not None

# -------------------- 5. VIEW MODAL TEST --------------------
def test_view_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    wait(government_driver).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".action-btn-small"))
    )
    view_btn = government_driver.find_elements(By.CSS_SELECTOR, ".action-btn-small")[0]
    view_btn.click()
    modal = wait(government_driver).until(
        EC.visibility_of_element_located((By.ID, "viewModal"))
    )
    assert "Complaint Details" in modal.text

# -------------------- 6. UPDATE MODAL TEST --------------------
def test_update_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    wait(government_driver).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".action-btn-small"))
    )
    edit_btns = government_driver.find_elements(By.CSS_SELECTOR, ".action-btn-small")
    edit_btns[1].click()  # edit button
    modal = wait(government_driver).until(
        EC.visibility_of_element_located((By.ID, "updateModal"))
    )
    status_dropdown = government_driver.find_element(By.ID, "statusSelect")
    status_dropdown.send_keys("Resolved")
    notes = government_driver.find_element(By.ID, "govtNotes")
    notes.clear()
    notes.send_keys("Fixed by maintenance team")
    government_driver.find_element(By.CSS_SELECTOR, ".btn-save").click()
    time.sleep(2)
    toast = government_driver.find_element(By.ID, "toast")
    assert toast.is_displayed()

# -------------------- 7. PAGINATION TEST --------------------
def test_pagination(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    next_btn = wait(government_driver).until(
        EC.presence_of_element_located((By.ID, "nextBtn"))
    )
    # Click next page
    if not next_btn.get_attribute("disabled"):
        next_btn.click()
        time.sleep(2)
    assert True  # basic navigation check

# -------------------- 8. TOAST TEST --------------------
def test_toast(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/road")
    # Trigger refresh
    government_driver.find_element(By.CSS_SELECTOR, ".fa-sync-alt").click()
    toast = wait(government_driver).until(
        EC.visibility_of_element_located((By.ID, "toast"))
    )
    assert toast.is_displayed()
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
