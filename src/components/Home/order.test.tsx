'use client';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Order from './order';

describe('Order Component', () => {
  it('renders both OrderSection components correctly', () => {
    render(<Order />);

    // ✅ Check both button texts
    const exploreButton = screen.getByRole('link', { name: /explore more/i });
    const sampleButton = screen.getByRole('link', { name: /order free samples/i });

    // Check presence
    expect(exploreButton).toBeInTheDocument();
    expect(sampleButton).toBeInTheDocument();

    // ✅ Check correct button text
    expect(exploreButton.textContent).toBe('Explore More');
    expect(sampleButton.textContent).toBe('Order Free Samples');

    // ✅ Check button classes for correct styling
    // exploreButton should be black (samplesection=false)
    expect(exploreButton.className).toMatch(/bg-black/);
    expect(exploreButton.className).toMatch(/text-white/);

    // sampleButton should be white (samplesection=true)
    expect(sampleButton.className).toMatch(/bg-white/);
    expect(sampleButton.className).toMatch(/text-black/);

    // ✅ Check both image alts exist
    const mainImages = screen.getAllByAltText(/order section main/i);
    const secondaryImages = screen.getAllByAltText(/order section secondary/i);

    expect(mainImages.length).toBe(2);
    expect(secondaryImages.length).toBe(2);
  });
});
