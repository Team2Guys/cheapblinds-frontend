// vitest.setup.ts
import '@testing-library/jest-dom'
import * as React from 'react';
import * as ReactDOMTestUtils from 'react-dom/test-utils';
import { vi } from 'vitest';

const reactAny = React as any;

// Only patch if React.act is missing
if (!('act' in reactAny)) {
  Object.defineProperty(reactAny, 'act', {
    value: ReactDOMTestUtils.act,
    writable: false,
    configurable: true,
  });
}

// ✅ Mock matchMedia to prevent errors in tests
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
