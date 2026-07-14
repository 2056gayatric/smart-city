import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

def test_government_login(driver, base_url):
    print(f"Starting Government Test...")
    
    driver.get(f"{base_url}/login")
    wait = WebDriverWait(driver, 15)

    # STEP 1: Click Authority
    admin_box = wait.until(EC.presence_of_element_located((By.ID, "adminBox")))
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", admin_box)
    wait.until(EC.element_to_be_clickable((By.ID, "adminBox")))
    driver.execute_script("arguments[0].click();", admin_box)

    # STEP 2: Wait for Department dropdown
    dept_dropdown = wait.until(EC.visibility_of_element_located((By.NAME, "department")))

    # STEP 3: Select Government
    select = Select(dept_dropdown)
    select.select_by_value("government")

    # STEP 4: Enter Email
    email_input = wait.until(EC.visibility_of_element_located((By.NAME, "email")))
    email_input.clear()
    email_input.send_keys("gov8517@gmail.com")

    # STEP 5: Enter Password
    password_input = driver.find_element(By.NAME, "password")
    password_input.clear()
    password_input.send_keys("Gov@123")

    # STEP 6: Click Login
    login_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']")))
    driver.execute_script("arguments[0].scrollIntoView({block:'center'});", login_btn)
    driver.execute_script("arguments[0].click();", login_btn)

    # STEP 7: Verify Login
    wait.until(lambda d: d.current_url != f"{base_url}/login")
    assert any(x in driver.current_url.lower() for x in ["dashboard", "government", "hospital", "court", "transport", "citizen"])
    print(f"Government Test PASSED")





if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-s", "-v"])
