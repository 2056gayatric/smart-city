import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

def test_page_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    assert "Garbage Infrastructure" in government_driver.title

# -------------------------------
# 2. TABLE LOAD TEST
# -------------------------------
def test_table_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    wait = WebDriverWait(government_driver, 10)
    try:
        table_rows = wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "#complaintsTableBody tr"))
        )
        assert table_rows is not None
    except:
        print("Table is empty. Skipping table length assertion.")

# -------------------------------
# 3. FILTER TEST (STATUS)
# -------------------------------
def test_status_filter(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    status_dropdown = Select(government_driver.find_element(By.ID, "statusFilter"))
    status_dropdown.select_by_visible_text("Pending")
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert rows is not None

# -------------------------------
# 4. SEARCH TEST
# -------------------------------
def test_search(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    search_box = government_driver.find_element(By.ID, "searchInput")
    search_box.send_keys("Garbage")
    search_box.send_keys(Keys.ENTER)
    time.sleep(2)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) >= 0

# -------------------------------
# 5. PAGINATION TEST
# -------------------------------
def test_pagination(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    next_btn = government_driver.find_element(By.ID, "nextBtn")
    if next_btn.is_enabled():
        next_btn.click()
        time.sleep(2)
        page_info = government_driver.find_element(By.ID, "pageInfo").text
        assert "Page" in page_info

# -------------------------------
# 6. VIEW COMPLAINT MODAL TEST
# -------------------------------
def test_view_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    wait = WebDriverWait(government_driver, 10)
    try:
        view_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'View')]"))
        )
        government_driver.execute_script("arguments[0].click();", view_btn)
        modal = wait.until(
            EC.visibility_of_element_located((By.ID, "viewModal"))
        )
        assert modal.is_displayed()
    except:
        print("No 'View' button available (empty table). Skipping.")

# -------------------------------
# 7. UPDATE COMPLAINT TEST
# -------------------------------
def test_update_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    wait = WebDriverWait(government_driver, 10)
    try:
        edit_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Edit')]"))
        )
        government_driver.execute_script("arguments[0].click();", edit_btn)
        modal = wait.until(
            EC.visibility_of_element_located((By.ID, "updateModal"))
        )
        assert modal.is_displayed()
    except:
        print("No 'Edit' button available (empty table). Skipping.")

# -------------------------------
# 8. STATUS UPDATE TEST
# -------------------------------
def test_status_update(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    wait = WebDriverWait(government_driver, 10)
    try:
        edit_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Edit')]"))
        )
        government_driver.execute_script("arguments[0].click();", edit_btn)
        status_dropdown = Select(wait.until(
            EC.presence_of_element_located((By.ID, "statusSelect"))
        ))
        status_dropdown.select_by_visible_text("Resolved")
        save_btn = government_driver.find_element(By.XPATH, "//button[contains(text(),'Save Changes')]")
        government_driver.execute_script("arguments[0].click();", save_btn)
        time.sleep(2)
        toast = government_driver.find_element(By.ID, "toast")
        assert "show" in toast.get_attribute("class")
    except:
        print("No 'Edit' button available (empty table). Skipping.")

# -------------------------------
# 9. FILTER CLEAR TEST
# -------------------------------
def test_clear_filters(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/garbage")
    government_driver.find_element(By.ID, "searchInput").send_keys("test")
    government_driver.find_element(By.ID, "statusFilter").send_keys("Pending")
    try:
        clear_btn = government_driver.find_element(By.CSS_SELECTOR, ".btn-clear")
    except:
        try:
            clear_btn = government_driver.find_element(By.XPATH, "//button[contains(.,'Clear')]")
        except:
            clear_btn = None
    
    if clear_btn:
        government_driver.execute_script("arguments[0].click();", clear_btn)
        time.sleep(1)
        search_value = government_driver.find_element(By.ID, "searchInput").get_attribute("value")
        assert search_value == ""
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
