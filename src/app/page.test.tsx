'use client';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from './page';

// ✅ Mock child components (same style as your AddBlogs test)
vi.mock('components/Home/order', () => ({
  __esModule: true,
  default: () => <div>Order Component</div>,
}));

vi.mock('components/Home/contactbanner', () => ({
  __esModule: true,
  default: () => <div>Contact Banner</div>,
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Order and ContactBanner components', () => {
    render(<Home />);

    // ✅ Check that both mocked components render correctly
    expect(screen.getByText(/Order Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Banner/i)).toBeInTheDocument();
  });
});
