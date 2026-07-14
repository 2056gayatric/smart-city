import sys
import os
sys.path.append(os.path.dirname(__file__))
import pytest
from testing_config import GET_DRIVER, BASE_URL
from auth_helper import perform_login

@pytest.fixture(scope="function")
def driver():
    """Basic driver fixture with headless mode disabled (UI visible)."""
    driver_instance = GET_DRIVER(headless=False)
    yield driver_instance
    driver_instance.quit()

@pytest.fixture(scope="session")
def base_url():
    """Fixture for the base URL."""
    return BASE_URL

@pytest.fixture(scope="function")
def citizen_driver(driver, base_url):
    """Authenticated driver for Citizen."""
    perform_login(driver, base_url, "citizen")
    return driver

@pytest.fixture(scope="function")
def government_driver(driver, base_url):
    """Authenticated driver for Government."""
    perform_login(driver, base_url, "government")
    return driver

@pytest.fixture(scope="function")
def hospital_driver(driver, base_url):
    """Authenticated driver for Hospital."""
    perform_login(driver, base_url, "hospital")
    return driver

@pytest.fixture(scope="function")
def court_driver(driver, base_url):
    """Authenticated driver for Court."""
    perform_login(driver, base_url, "court")
    return driver

@pytest.fixture(scope="function")
def transport_driver(driver, base_url):
    """Authenticated driver for Transport."""
    perform_login(driver, base_url, "transport")
    return driver
