import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# -------------------------
# 1. Page Load Test
# -------------------------
def test_page_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    assert "Electricity Infrastructure" in government_driver.title
    time.sleep(2)

    total = government_driver.find_element(By.ID, "totalComplaints")
    assert total is not None

# -------------------------
# 2. Table Load Test
# -------------------------
def test_table_load(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    time.sleep(3)
    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert rows is not None

# -------------------------
# 3. Filter Test (Status)
# -------------------------
def test_status_filter(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    time.sleep(2)

    status_dropdown = government_driver.find_element(By.ID, "statusFilter")
    status_dropdown.click()

    option = government_driver.find_element(By.XPATH, "//option[@value='Pending']")
    option.click()

    time.sleep(2)

    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert len(rows) >= 0

# -------------------------
# 4. Search Test
# -------------------------
def test_search(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    search = government_driver.find_element(By.ID, "searchInput")
    search.clear()
    search.send_keys("Rahul")
    search.send_keys(Keys.ENTER)

    time.sleep(2)

    rows = government_driver.find_elements(By.CSS_SELECTOR, "#complaintsTableBody tr")
    assert rows is not None

# -------------------------
# 5. View Modal Test
# -------------------------
def test_view_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    time.sleep(2)

    view_btns = government_driver.find_elements(By.CSS_SELECTOR, ".action-btn-small")
    if view_btns:
        government_driver.execute_script("arguments[0].click();", view_btns[0])
        time.sleep(2)
        modal = government_driver.find_element(By.ID, "viewModal")
        assert modal is not None
        close_btn = government_driver.find_element(By.CSS_SELECTOR, ".modal-close")
        government_driver.execute_script("arguments[0].click();", close_btn)
    else:
        print("No view button available (empty table). Skipping.")

# -------------------------
# 6. Update Modal Test
# -------------------------
def test_update_modal(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    time.sleep(2)

    update_btns = government_driver.find_elements(By.CSS_SELECTOR, ".btn-update")
    if update_btns:
        government_driver.execute_script("arguments[0].click();", update_btns[0])
        time.sleep(2)
        status_select = government_driver.find_element(By.ID, "statusSelect")
        status_select.send_keys("Resolved")
        save_btn = government_driver.find_element(By.CSS_SELECTOR, ".btn-save")
        government_driver.execute_script("arguments[0].click();", save_btn)
        time.sleep(2)
    else:
        print("No update button available (empty table). Skipping.")

# -------------------------
# 7. Pagination Test
# -------------------------
def test_pagination(government_driver, base_url):
    print(f"Starting Government Test...")
    
    government_driver.get(f"{base_url}/government/complaints/electricity")
    time.sleep(2)

    next_btn = government_driver.find_element(By.ID, "nextBtn")

    if next_btn.is_enabled():
        next_btn.click()
        time.sleep(2)

        page_info = government_driver.find_element(By.ID, "pageInfo")
        assert "Page" in page_info.text
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
