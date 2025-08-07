// vitest.setup.ts
import '@testing-library/jest-dom'
import * as React from 'react';
import * as ReactDOMTestUtils from 'react-dom/test-utils';

const reactAny = React as any;

// Only patch if React.act is missing
if (!('act' in reactAny)) {
  Object.defineProperty(reactAny, 'act', {
    value: ReactDOMTestUtils.act,
    writable: false,
    configurable: true,
  });
}