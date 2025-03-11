import { cn, hexToHSL, hexToRGB, rgbToHex, sleep } from '@/lib/utils';

describe('cn()', () => {
  it('merges class names correctly', () => {
    const result = cn('btn', 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });

  it('handles conditional class names correctly', () => {
    const isTrue = true;
    const result = cn(
      'btn',
      isTrue && 'btn-primary',
      !isTrue && 'btn-secondary',
    );
    expect(result).toBe('btn btn-primary');
  });

  it('removes duplicate class names using tailwind-merge', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2'); // tailwind-merge should keep only the last class
  });

  it('handles empty and undefined values correctly', () => {
    const result = cn('btn', undefined, null, '', 'btn-primary');
    expect(result).toBe('btn btn-primary');
  });

  it('merges array and object syntax correctly', () => {
    const result = cn(['btn', { 'btn-primary': true, 'btn-secondary': false }]);
    expect(result).toBe('btn btn-primary');
  });

  it('returns an empty string if no valid class names are provided', () => {
    const result = cn(undefined, null, false, '');
    expect(result).toBe('');
  });
});

describe('sleep()', () => {
  vi.useFakeTimers();

  beforeAll(() => {
    vi.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('waits for the specified amount of time', async () => {
    const ms = 1000;

    const sleepPromise = sleep(ms);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), ms);

    vi.advanceTimersByTime(ms);

    await expect(sleepPromise).resolves.toBeUndefined();
  });
});

describe('rgbToHex()', () => {
  test('convert to hex(uint)', () => {
    expect(rgbToHex('rgb(255, 255, 255)')).toBe('#ffffff');
    expect(rgbToHex('rgb(0 0 255)')).toBe('#0000ff');
    expect(rgbToHex('rgb(300 255 255)')).toBe(null);
  });

  test('convert to hex(percentage)', () => {
    expect(rgbToHex('rgb(100%, 50%, 0%)')).toBe('#ff8000');
    expect(rgbToHex('rgb(100% 50% 25%)')).toBe('#ff8040');
    expect(rgbToHex('rgb(150%, 100%, 90%)')).toBe(null);
  });
});

describe('hexToRGB()', () => {
  test('#RRGGBB', () => {
    expect(hexToRGB('#FF5733')).toBe('rgb(255 87 51)');
    expect(hexToRGB('#FF5733', { includeAlpha: true })).toBe(
      'rgb(255 87 51 / 1)',
    );
  });

  test('#RGB', () => {
    expect(hexToRGB('#03F')).toBe('rgb(0 51 255)');
    expect(hexToRGB('#03F', { includeAlpha: true })).toBe('rgb(0 51 255 / 1)');
  });

  test('#RRGGBBAA', () => {
    expect(hexToRGB('#FF573380')).toBe('rgb(255 87 51 / 0.50)');
    expect(hexToRGB('#FF573380', { includeAlpha: true })).toBe(
      'rgb(255 87 51 / 0.50)',
    );
  });

  test('#RGBA', () => {
    expect(hexToRGB('#03FA')).toBe('rgb(0 51 255 / 0.67)');
    expect(hexToRGB('#03FA', { includeAlpha: true })).toBe(
      'rgb(0 51 255 / 0.67)',
    );
  });
});

describe('hexToHSL()', () => {
  test('#RRGGBB', () => {
    expect(hexToHSL('#ff5733')).toBe('hsl(11 100% 60%)');
    expect(hexToHSL('#3498db', { includeAlpha: true })).toBe(
      'hsl(204 70% 53% / 1)',
    );
  });

  test('#RGB', () => {
    expect(hexToHSL('#f00')).toBe('hsl(0 100% 50%)');
    expect(hexToHSL('#0f0')).toBe('hsl(120 100% 50%)');
    expect(hexToHSL('#00f', { includeAlpha: true })).toBe(
      'hsl(240 100% 50% / 1)',
    );
  });

  test('#RRGGBBAA', () => {
    expect(hexToHSL('#ff573380')).toBe('hsl(11 100% 60% / 0.5)');
    expect(hexToHSL('#3498dbcc')).toBe('hsl(204 70% 53% / 0.8)');
    expect(hexToHSL('#00ff00aa', { includeAlpha: true })).toBe(
      'hsl(120 100% 50% / 0.67)',
    );
  });

  test('#RGBA', () => {
    expect(hexToHSL('#0f08')).toBe('hsl(120 100% 50% / 0.53)'); // 수정된 예상 값
  });
});
