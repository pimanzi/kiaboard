import { formatDateForDisplay } from '@/lib/helpers';

describe('formatDateForDisplay', () => {
  it('should format date for en-US locale', () => {
    const result = formatDateForDisplay('2024-05-26', 'en');
    expect(result).toBe('May 26, 2024');
  });

  it('should format date for fr-FR locale', () => {
    const result = formatDateForDisplay('2024-05-26', 'fr');
    expect(result).toBe('26 mai 2024');
  });

  it('should handle different months correctly', () => {
    const result = formatDateForDisplay('2024-12-31', 'en');
    expect(result).toBe('December 31, 2024');
  });

  it('should handle leap year dates', () => {
    const result = formatDateForDisplay('2024-02-29', 'en');
    expect(result).toBe('February 29, 2024');
  });
});
