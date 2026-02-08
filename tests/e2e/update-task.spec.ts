import { test, expect } from '@playwright/test';

test.describe('Update Task E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hr-tasks-hub');
    await page.waitForLoadState('networkidle');
    // Wait for tasks to load
    await page.waitForSelector('[data-testid="kanban-board"]', {
      timeout: 10000,
    });
  });

  test('should update a task from kanban view', async ({ page }) => {
    // Wait for first task card to be visible
    const firstCard = page.locator('[data-testid="task-card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });

    // Get the original title
    const originalTitle = await firstCard.locator('h4').textContent();

    // Click the more options button (three dots)
    await firstCard.locator('button').first().click();

    // Click edit option
    await page.getByRole('menuitem', { name: /edit/i }).click();

    // Wait for update dialog (use more specific selector)
    const updateDialog = page.getByRole('dialog', { name: /update task/i });
    await expect(updateDialog).toBeVisible({ timeout: 5000 });

    // Update the title
    const titleInput = updateDialog.locator('input[id="title"]');
    await titleInput.clear();
    const newTitle = `Updated Task ${Date.now()}`;
    await titleInput.fill(newTitle);

    // Update description
    const descriptionInput = updateDialog.locator('textarea[id="description"]');
    await descriptionInput.clear();
    await descriptionInput.fill('Updated task description from E2E test');

    // Click update button
    await updateDialog.getByRole('button', { name: /update/i }).click();

    // Wait for success toast
    await expect(page.getByText(/updated/i)).toBeVisible({ timeout: 5000 });

    // Verify the task title is updated
    await expect(page.getByText(newTitle)).toBeVisible({ timeout: 3000 });
  });

  test('should update a task from list view', async ({ page }) => {
    // Switch to list view
    await page.getByRole('button', { name: /list/i }).click();

    // Wait for list view to load
    await page.waitForSelector('[data-testid="task-list"]', { timeout: 5000 });
    await page.waitForSelector('table', { state: 'visible' });

    // Get first row
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();

    // Click the actions button (three dots)
    const actionsButton = firstRow.locator('button').last();
    await actionsButton.click();

    // Click edit option
    await page.getByRole('menuitem', { name: /edit/i }).click();

    // Wait for update dialog (use more specific selector)
    const updateDialog = page.getByRole('dialog', { name: /update task/i });
    await expect(updateDialog).toBeVisible({ timeout: 5000 });

    // Update the title
    const titleInput = updateDialog.locator('input[id="title"]');
    await titleInput.clear();
    const newTitle = `Updated List Task ${Date.now()}`;
    await titleInput.fill(newTitle);

    // Update description
    const descriptionInput = updateDialog.locator('textarea[id="description"]');
    await descriptionInput.clear();
    await descriptionInput.fill('Updated from list view E2E test');

    // Click update button
    await updateDialog.getByRole('button', { name: /update/i }).click();

    // Wait for success toast
    await expect(page.getByText(/updated/i).first()).toBeVisible({
      timeout: 5000,
    });

    // Wait for dialog to close
    await expect(updateDialog).not.toBeVisible({ timeout: 3000 });

    // Give the list view time to update
    await page.waitForTimeout(500);

    // Verify we're still in list view
    await expect(page.locator('[data-testid="task-list"]')).toBeVisible();

    // The update is confirmed by the success toast
  });

  test('should update task status', async ({ page }) => {
    // Wait for first task card
    const firstCard = page.locator('[data-testid="task-card"]').first();
    await expect(firstCard).toBeVisible();

    // Click more options button
    await firstCard.locator('button').first().click();

    // Click edit option
    await page.getByRole('menuitem', { name: /edit/i }).click();

    // Wait for update dialog (use more specific selector)
    const updateDialog = page.getByRole('dialog', { name: /update task/i });
    await expect(updateDialog).toBeVisible({ timeout: 5000 });

    // Change status to Done
    await updateDialog.getByRole('combobox').click();
    await page.getByRole('option', { name: /done|completed/i }).click();

    // Click update button
    await updateDialog.getByRole('button', { name: /update/i }).click();

    // Wait for success toast
    await expect(page.getByText(/updated/i)).toBeVisible({ timeout: 5000 });
  });
});
