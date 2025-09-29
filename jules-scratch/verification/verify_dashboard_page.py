from playwright.sync_api import sync_playwright, TimeoutError

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Mock the authentication endpoint with a glob pattern for robust matching
    page.route(
        "**/api/auth/user",
        lambda route: route.fulfill(
            status=200,
            json={"id": "1", "username": "testuser"},
        ),
    )

    try:
        page.goto("http://localhost:5000", wait_until="domcontentloaded")
        page.wait_for_selector('[data-testid="title-dashboard"]', timeout=10000)
        # If the selector is found, the test is successful. Take the final screenshot.
        page.screenshot(path="jules-scratch/verification/dashboard_page.png")
        print("Dashboard verification successful!")

    except TimeoutError:
        print("Timeout waiting for dashboard. Capturing state for debugging.")
        page.screenshot(path="jules-scratch/verification/dashboard_debug_screenshot.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)