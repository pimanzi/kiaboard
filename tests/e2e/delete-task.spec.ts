import { test, expect } from '@playwright/test';

test.describe('Delete Task E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hr-tasks-hub');
    await page.waitForLoadState('networkidle');
    // Wait for tasks to load
    await page.waitForSelector('[data-testid="kanban-board"]', {
      timeout: 10000,
    });
  });

  test('should delete a task from kanban view', async ({ page }) => {
    // Wait for first task card
    const firstCard = page.locator('[data-testid="task-card"]').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });

    // Get the task title for verification
    const taskTitle = await firstCard.locator('h4').textContent();

    // Click more options button (three dots)
    await firstCard.locator('button').first().click();

    // Click delete option
    await page.getByRole('menuitem', { name: /delete/i }).click();

    // Wait for confirmation dialog (use more specific selector)
    const deleteDialog = page.getByRole('dialog', { name: /delete task/i });
    await expect(deleteDialog).toBeVisible({ timeout: 5000 });

    // Confirm deletion
    await deleteDialog.getByRole('button', { name: /delete/i }).click();

    // Wait for success toast (use first() to handle duplicates)
    await expect(page.getByText(/deleted/i).first()).toBeVisible({
      timeout: 5000,
    });

    // Verify task is no longer visible
    if (taskTitle) {
      await expect(page.locator(`text=${taskTitle}`).first()).not.toBeVisible({
        timeout: 3000,
      });
    }
  });

  test('should delete a task from list view', async ({ page }) => {
    // Switch to list view
    await page.getByRole('button', { name: /list/i }).click();

    // Wait for list view to load
    await page.waitForSelector('[data-testid="task-list"]', { timeout: 5000 });
    await page.waitForSelector('table', { state: 'visible' });

    // Get first row
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();

    // Get task name for verification
    const taskName = await firstRow.locator('td').nth(1).textContent();

    // Click actions button (three dots)
    const actionsButton = firstRow.locator('button').last();
    await actionsButton.click();

    // Click delete option
    await page.getByRole('menuitem', { name: /delete/i }).click();

    // Wait for confirmation dialog (use more specific selector)
    const deleteDialog = page.getByRole('dialog', { name: /delete task/i });
    await expect(deleteDialog).toBeVisible({ timeout: 5000 });

    // Confirm deletion
    await deleteDialog.getByRole('button', { name: /delete/i }).click();

    // Wait for success toast (use first() to handle duplicates)
    await expect(page.getByText(/deleted/i).first()).toBeVisible({
      timeout: 5000,
    });

    // Verify task is no longer visible
    if (taskName) {
      await expect(page.locator(`text=${taskName}`).first()).not.toBeVisible({
        timeout: 3000,
      });
    }
  });
});
