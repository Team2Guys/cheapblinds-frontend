'use client';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from './page';

// ✅ Mock all child components
vi.mock('components/common/hero-banner', () => ({
  __esModule: true,
  default: () => <div>Mocked HeroBanner</div>,
}));

vi.mock('components/common/related-product', () => ({
  __esModule: true,
  default: () => <div>Mocked RelatedProduct</div>,
}));

vi.mock('components/common/reviews', () => ({
  __esModule: true,
  default: () => <div>Mocked Reviews</div>,
}));

vi.mock('components/Home/child-safety', () => ({
  __esModule: true,
  default: () => <div>Mocked ChildSafety</div>,
}));

vi.mock('components/Home/contactbanner', () => ({
  __esModule: true,
  default: () => <div>Mocked ContactBanner</div>,
}));

vi.mock('components/Home/information', () => ({
  __esModule: true,
  default: () => <div>Mocked Information</div>,
}));

vi.mock('components/Home/ordersample', () => ({
  __esModule: true,
  default: () => <div>Mocked OrderSection</div>,
}));

describe('🏠 Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main sections correctly', () => {
    render(<Home />);

    // ✅ Single instance components
    expect(screen.getByText('Mocked Reviews')).toBeInTheDocument();
    expect(screen.getByText('Mocked Information')).toBeInTheDocument();
    expect(screen.getByText('Mocked ChildSafety')).toBeInTheDocument();
    expect(screen.getByText('Mocked ContactBanner')).toBeInTheDocument();

    // ✅ Multiple HeroBanner components
    const heroBanners = screen.getAllByText('Mocked HeroBanner');
    expect(heroBanners).toHaveLength(3);

    // ✅ Multiple RelatedProduct components
    const relatedProducts = screen.getAllByText('Mocked RelatedProduct');
    expect(relatedProducts).toHaveLength(2);

    // ✅ Multiple OrderSection components
    const orderSections = screen.getAllByText('Mocked OrderSection');
    expect(orderSections).toHaveLength(2);
  });
});
