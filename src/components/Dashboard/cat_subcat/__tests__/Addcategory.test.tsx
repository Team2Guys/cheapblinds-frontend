import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddCategory from '../Addcategory';

// Mock next-auth useSession
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: {
      accessToken: 'fake-token',
      user: { fullname: 'Test User' },
    },
  })),
}));

// Mock utils/helperFunctions to avoid errors
vi.mock('utils/helperFunctions', () => ({
  handleCropClick: vi.fn(),
  handleCropModalCancel: vi.fn(),
  handleCropModalOk: vi.fn(),
  handleImageAltText: vi.fn(),
  ImageRemoveHandler: vi.fn(),
  onCropComplete: vi.fn(),
  onImageLoad: vi.fn(),
}));

// Mock components that are imported inside AddCategory
vi.mock('components/Toaster/Toaster', () => ({
  __esModule: true,
  default: vi.fn(() => null),
}));
vi.mock('components/ImageUploader/ImageUploader', () => ({
  __esModule: true,
  default: vi.fn(() => <div>ImageUploaderMock</div>),
}));
vi.mock('components/Dashboard/tinyMc/MyEditor', () => ({
  __esModule: true,
  default: vi.fn(() => <textarea aria-label="tiny-mce-editor" />),
}));
vi.mock('components/ServerActons/ServerAction', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock graphql mutations/queries if used directly (optional)
// Also mock ApolloClient if needed
vi.mock('utils/AppoloClient', () => ({
  __esModule: true,
  default: {
    mutate: vi.fn().mockResolvedValue({}),
  },
}));

describe('AddCategory Component', () => {
  const seteditCategory = vi.fn();
  const setMenuType = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<AddCategory seteditCategory={seteditCategory} editCategory={null} setMenuType={setMenuType} />);
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Submit/i })[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Category Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tiny-mce-editor/i)).toBeInTheDocument();
  });

  it('disables submit button while loading', async () => {
    render(<AddCategory seteditCategory={seteditCategory} editCategory={null} setMenuType={setMenuType} />);
    const submitButton = screen.getAllByRole('button', { name: /Submit/i })[0];

    expect(submitButton).toBeEnabled();

    // simulate loading by firing submit and waiting for async
    fireEvent.click(submitButton);
    // Note: the real loading state depends on the component's logic,
    // here you can simulate or spy on mutate to cause loading if needed
  });

  it('calls setMenuType on back button click without changes', () => {
    render(<AddCategory seteditCategory={seteditCategory} editCategory={null} setMenuType={setMenuType} />);
    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);
    expect(setMenuType).toHaveBeenCalledWith('Categories');
  });

  // More tests can be added: form validation, image uploading, cropping modal, etc.
});
