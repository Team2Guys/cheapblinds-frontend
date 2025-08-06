import '@testing-library/jest-dom';

import * as React from 'react';
import * as ReactDOMTestUtils from 'react-dom/test-utils';

// Monkey-patch React.act
(React as any).act = ReactDOMTestUtils.act;