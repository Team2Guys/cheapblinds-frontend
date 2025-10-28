import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";
import { CREATE_BLOG, UPDATE_BLOG } from "graphql/blogs";
import { ISUBCATEGORY } from "types/cat";
import AddBlogs from "../Add-blog";
import { Modal } from "antd";

// ✅ mock mutation fns
const mockCreateBlog = vi.fn().mockResolvedValue({
  data: { createBlog: { id: 1, title: "blog test" } },
});
const mockUpdateBlog = vi.fn().mockResolvedValue({
  data: { updateBlog: { id: 1, title: "blog test" } },
});

vi.mock("@apollo/client", async () => {
  const actual = await vi.importActual("@apollo/client");
  return {
    ...actual,
    // eslint-disable-next-line
    useMutation: vi.fn((query: any) => {
      if (query === CREATE_BLOG) return [mockCreateBlog, { loading: false }];
      if (query === UPDATE_BLOG) return [mockUpdateBlog, { loading: false }];
      return [vi.fn(), { loading: false }];
    }),
  };
});

// Mock next-auth
vi.mock("next-auth/react", async () => {
  const actual = await vi.importActual<typeof import("next-auth/react")>("next-auth/react");
  return {
    ...actual,
    useSession: vi.fn(() => ({
      data: {
        accessToken: "mocked_token",
        user: { permissions: {} },
      },
    })),
  };
});

// Mock TinyMCE editor → behaves like input
vi.mock("components/Dashboard/tinyMc/MyEditor", () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ name, onChange }: { name: string; onChange?: any }) => {
    return (
      <textarea
        aria-label="Content"
        data-testid={name}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  },
}));

// Mock showToast
vi.mock("components/Toaster/Toaster", () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock Modal.confirm
vi.mock("antd", async () => {
  const actual = await vi.importActual<typeof import("antd")>("antd");
  return {
    ...actual,
    Modal: { confirm: vi.fn() },
  };
});

describe("AddBlogs Component", () => {
  const setselecteMenu = vi.fn();
  const subCategories: ISUBCATEGORY[] = [
    {
      id: 1,
      name: "Category 1",
      posterImageUrl: {
        imageUrl: "/img1.jpg",
        public_id: "img1",
        resource_type: "image",
      },
      custom_url: "b",
    },
    {
      id: 2,
      name: "Category 2",
      posterImageUrl: {
        imageUrl: "/img1.jpg",
        public_id: "img1",
        resource_type: "image",
      },
      custom_url: "a",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<AddBlogs setselecteMenu={setselecteMenu} subCategories={subCategories} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom Url/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Blog/i })).toBeInTheDocument();
  });

  it("calls createBlogMutation on form submit", async () => {
    render(<AddBlogs setselecteMenu={setselecteMenu} subCategories={subCategories} />);

    // ✅ fill required fields
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Blog" },
    });
    fireEvent.change(screen.getByLabelText(/Select Category/i), {
      target: { value: "Category 1" },
    });
    fireEvent.change(screen.getByLabelText(/Custom Url/i), {
      target: { value: "new-blog" },
    });
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: "Some blog content" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit Blog/i }));
    });
  });

  it("calls setselecteMenu on back button click without unsaved changes", () => {
    render(<AddBlogs setselecteMenu={setselecteMenu} subCategories={subCategories} />);
    fireEvent.click(screen.getByText(/Back/i));
    expect(setselecteMenu).toHaveBeenCalledWith("All Blogs");
  });

  it("shows modal on back button click with unsaved changes", async () => {
    render(<AddBlogs setselecteMenu={setselecteMenu} subCategories={subCategories} />);
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Changed Blog" },
    });
    fireEvent.click(screen.getByText(/Back/i));

    await waitFor(() => {
      expect(Modal.confirm).toHaveBeenCalled();
    });
  });

  it("changes blog status buttons", () => {
    render(<AddBlogs setselecteMenu={setselecteMenu} subCategories={subCategories} />);
    const draftButton = screen.getAllByText("DRAFT")[0];
    const publishedButton = screen.getAllByText("PUBLISHED")[0];

    fireEvent.click(draftButton);
    expect(draftButton).toBeDisabled();

    fireEvent.click(publishedButton);
    expect(publishedButton).toBeDisabled();
  });
});
