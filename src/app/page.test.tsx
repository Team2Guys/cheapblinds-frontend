'use client';
import React from 'react'; // ✅ Required for JSX

import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
    it('renders the testing div', () => {
        render(<Home />);
        const divElement = screen.getByText(/testing/i);
        expect(divElement).toBeInTheDocument();
        expect(divElement).toHaveClass('testing');
    });
});



