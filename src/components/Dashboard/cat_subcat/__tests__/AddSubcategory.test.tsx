import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AddSubcategory from "../AddSubcategory";
import userEvent from "@testing-library/user-event";

// Mock next-auth useSession
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: {
      accessToken: "fake-token",
      user: { fullname: "Test User" },
    },
  })),
}));

// Mock utils/helperFunctions
vi.mock("utils/helperFunctions", () => ({
  handleCropClick: vi.fn(),
  handleCropModalCancel: vi.fn(),
  handleCropModalOk: vi.fn(),
  handleImageAltText: vi.fn(),
  ImageRemoveHandler: vi.fn(),
  onCropComplete: vi.fn(),
  onImageLoad: vi.fn(),
}));

// Mock components
vi.mock("components/Toaster/Toaster", () => ({
  __esModule: true,
  default: vi.fn(() => null),
}));
vi.mock("components/ImageUploader/ImageUploader", () => ({
  __esModule: true,
  default: vi.fn(() => <div>ImageUploaderMock</div>),
}));
vi.mock("components/Dashboard/tinyMc/MyEditor", () => ({
  __esModule: true,
  default: vi.fn(() => <textarea aria-label="tiny-mce-editor" />),
}));
vi.mock("components/ServerActons/ServerAction", () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock Apollo Client mutation
vi.mock("@apollo/client", async (importOriginal) => {
  // eslint-disable-next-line
  const actual: any = await importOriginal(); // keeps real exports for partial mocking
  return {
    ...actual,
    ApolloClient: vi.fn(),
    InMemoryCache: vi.fn(),
    useMutation: vi.fn(() => [vi.fn(), {}]),
    useQuery: vi.fn(() => ({})),
    gql: actual.gql, // 👈 this fixes the error
  };
});

describe("AddSubcategory Component", () => {
  const seteditCategory = vi.fn();
  const setMenuType = vi.fn();
  const categoriesList = [
    {
      id: 1,
      name: "Category A",
      posterImageUrl: { imageUrl: "/img1.jpg", public_id: "img1", resource_type: "image" },
      custom_url: "b",
    },
    {
      id: 2,
      name: "Category B",
      posterImageUrl: { imageUrl: "/img1.jpg", public_id: "img1", resource_type: "image" },
      custom_url: "a",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(
      <AddSubcategory
        seteditCategory={seteditCategory}
        editCategory={null}
        setMenuType={setMenuType}
        categoriesList={categoriesList}
      />,
    );

    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Submit/i })[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Sub Category Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom Url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Parent Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tiny-mce-editor/i)).toBeInTheDocument();
  });

  it("calls setMenuType on back button click without unsaved changes", () => {
    render(
      <AddSubcategory
        seteditCategory={seteditCategory}
        editCategory={null}
        setMenuType={setMenuType}
        categoriesList={categoriesList}
      />,
    );

    fireEvent.click(screen.getByText(/Back/i));
    expect(setMenuType).toHaveBeenCalledWith("Sub Categories");
  });

  it("submits form when valid values provided", async () => {
    render(
      <AddSubcategory
        seteditCategory={seteditCategory}
        editCategory={null}
        setMenuType={setMenuType}
        categoriesList={categoriesList}
      />,
    );

    // type into input fields
    await userEvent.type(screen.getByLabelText(/Sub Category Title/i), "New Subcategory");
    await userEvent.type(screen.getByLabelText(/Custom Url/i), "new-sub");

    await userEvent.click(screen.getByRole("combobox"));
    // look for "Category A"
    const categoryOption = await screen.findByText(/Category A/i);
    expect(categoryOption).toBeInTheDocument();

    // select it
    await userEvent.click(categoryOption);

    const submitButton = screen.getByLabelText(/Submit Subcategory/i);
    await userEvent.click(submitButton);
  });
});
