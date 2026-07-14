import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from testing_config import CREDENTIAL_MAP

def perform_login(driver, base_url, role):
    """
    General login helper for all roles.
    """
    driver.delete_all_cookies()
    driver.get(f"{base_url}/login")
    wait = WebDriverWait(driver, 15)
    
    creds = CREDENTIAL_MAP.get(role)
    if not creds:
        raise ValueError(f"Unknown role: {role}")

    if role != "citizen":
        # Authority login flow
        print(f"Logging in as authority role: {role}")
        admin_box = wait.until(EC.element_to_be_clickable((By.ID, "adminBox")))
        driver.execute_script("arguments[0].click();", admin_box)
        # Ensure hidden role input is set to admin
        driver.execute_script("document.getElementById('role').value = 'admin';")
        
        # Wait for the department dropdown to actually be visible in the DOM style
        wait.until(EC.visibility_of_element_located((By.NAME, "department")))
        dept_dropdown = driver.find_element(By.NAME, "department")
        Select(dept_dropdown).select_by_value(role)
    else:
        # Citizen login flow (default)
        print("Logging in as citizen")
        citizen_box = wait.until(EC.element_to_be_clickable((By.ID, "citizenBox")))
        driver.execute_script("arguments[0].click();", citizen_box)
        # Ensure hidden role input is set to citizen
        driver.execute_script("document.getElementById('role').value = 'citizen';")

    # Common fields
    email_input = wait.until(EC.visibility_of_element_located((By.NAME, "email")))
    email_input.clear()
    email_input.send_keys(creds["email"])

    password_input = driver.find_element(By.NAME, "password")
    password_input.clear()
    password_input.send_keys(creds["password"])

    # Double check hidden roles and visible departments via JS
    if role != "citizen":
        driver.execute_script("document.getElementById('role').value = 'admin';")
        driver.execute_script(f"document.getElementsByName('department')[0].value = '{role}';")
    else:
        driver.execute_script("document.getElementById('role').value = 'citizen';")

    time.sleep(1) # Small pause for any animations
    
    # Use JS submission instead of button click or form.submit() for absolute certainty
    print(f"Final submission as {role}...")
    driver.execute_script("document.querySelector('form').submit();")

    # Wait for login to complete and redirect
    # Authority roles might redirect to /court, /government, etc.
    if role == "citizen":
        expected_path = "/citizen"
    else:
        # Map roles to their expected dashboard paths if they differ
        role_path_map = {
            "government": "/government",
            "court": "/court",
            "hospital": "/hospital",
            "transport": "/transport"
        }
        expected_path = role_path_map.get(role, f"/{role}")
    
    # Wait for login to complete and redirect
    wait_long = WebDriverWait(driver, 30)
    try:
        wait_long.until(lambda d: expected_path in d.current_url.lower())
        print(f"Successfully logged in as {role}. Current URL: {driver.current_url}")
    except Exception as e:
        print(f"TIMEOUT waiting for {expected_path} in {driver.current_url}")
        # Check for error message on page
        try:
            error_msg = driver.find_element(By.ID, "loginError").text
            print(f"Login failed with error: {error_msg}")
        except:
            print("No #loginError found on page.")
        
        # Log more info
        print(f"Current URL: {driver.current_url}")
        print(f"FULL Page Source: {driver.page_source}")
        raise e

    return True
