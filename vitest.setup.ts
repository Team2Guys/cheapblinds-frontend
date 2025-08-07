// vitest.setup.ts
import '@testing-library/jest-dom'
import * as React from 'react';
import * as ReactDOMTestUtils from 'react-dom/test-utils';


if (typeof (React as any).act !== 'function') {
  // @ts-ignore
  React.act = ReactDOMTestUtils.act;
}