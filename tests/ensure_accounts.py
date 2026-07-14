import time
from testing_config import GET_DRIVER, BASE_URL, CREDENTIAL_MAP
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def ensure_accounts():
    driver = GET_DRIVER(headless=True)
    wait = WebDriverWait(driver, 10)
    
    roles = ["citizen", "government", "hospital", "court", "transport"]
    
    for role in roles:
        creds = CREDENTIAL_MAP[role]
        print(f"Ensuring account for {role}: {creds['email']}")
        
        # Determine registration URL
        if role == "citizen":
            reg_url = f"{base_url}/citizen/citizen_register"
        else:
            reg_url = f"{base_url}/{role}/{role}_register"
            
        driver.get(reg_url)
        time.sleep(2)
        
        try:
            # Fill registration form
            wait.until(EC.visibility_of_element_located((By.NAME, "email"))).send_keys(creds["email"])
            driver.find_element(By.NAME, "password").send_keys(creds["password"])
            driver.find_element(By.NAME, "confirm_password").send_keys(creds["password"])
            
            # Submit
            submit_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
            driver.execute_script("arguments[0].click();", submit_btn)
            
            time.sleep(3)
            print(f"Registration attempt finished for {role}. Current URL: {driver.current_url}")
        except Exception as e:
            print(f"Failed or already exists for {role}: {e}")
            
    driver.quit()

if __name__ == "__main__":
    base_url = BASE_URL
    ensure_accounts()
