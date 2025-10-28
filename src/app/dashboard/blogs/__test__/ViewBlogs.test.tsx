import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import Swal from "sweetalert2";
import ViewBlog from "../view-blog";
import { IBlog } from "types/general";
import { REMOVE_BLOG } from "graphql/blogs";

// Mock useMutation
const mockRemoveBlog = vi.fn();
vi.mock("@apollo/client", async () => {
  const actual = await vi.importActual("@apollo/client");
  return {
    ...actual,
    useMutation: vi.fn(() => [mockRemoveBlog, { loading: false }]),
  };
});

// Mock next-auth
vi.mock("sweetalert2", async () => {
  const actual = await vi.importActual<typeof import("sweetalert2")>("sweetalert2");
  return {
    __esModule: true,
    ...actual,
    default: {
      fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
    },
    fire: vi.fn(() => Promise.resolve({ isConfirmed: true })),
  };
});

vi.mock("next-auth/react", async () => {
  const actual = await vi.importActual<typeof import("next-auth/react")>("next-auth/react");
  return {
    __esModule: true,
    ...actual,
    useSession: vi.fn(() => ({
      data: {
        accessToken: "mocked_token",
        user: {
          permissions: {
            canDeleteBlog: true,
            canAddBlog: true,
            canEditBlog: true,
          },
        },
      },
    })),
  };
});

const mocks = [
  {
    request: {
      query: REMOVE_BLOG,
      variables: { id: 1 },
    },
    result: {
      data: {
        removeProduct: {
          id: 1,
        },
      },
    },
  },
];

// Mock notification
vi.mock("antd", () => ({
  notification: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ViewBlog Component", () => {
  const setselecteMenu = vi.fn();
  const setEditblog = vi.fn();
  const blogs: IBlog[] = [
    {
      id: "1",
      title: "Blog 1",
      custom_url: "blog-1",
      category: "Category 1",
      createdAt: "2025-08-20T00:00:00Z",
      updatedAt: "2025-08-21T00:00:00Z",
      posterImage: { imageUrl: "/img1.jpg", altText: "Image 1", public_id: "dsdasd" },
      status: "PUBLISHED",
      content: "This is blog 1 content", // ✅ added
      isPublished: true, // ✅ added
    },
    {
      id: "2",
      title: "Blog 2",
      custom_url: "blog-2",
      category: "Category 2",
      createdAt: "2025-08-19T00:00:00Z",
      updatedAt: "2025-08-20T00:00:00Z",
      posterImage: { imageUrl: "/img2.jpg", altText: "Image 2", public_id: "dsdasdasdasd" },
      status: "DRAFT",
      content: "This is blog 2 content", // ✅ added
      isPublished: false, // ✅ added
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders blogs and search input", () => {
    render(
      <MockedProvider>
        <ViewBlog blogs={blogs} setselecteMenu={setselecteMenu} setEditblog={setEditblog} />
      </MockedProvider>,
    );

    expect(screen.getByPlaceholderText(/Search by title or URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Blog 2/i)).toBeInTheDocument();
  });

  it("filters blogs by search term", () => {
    render(
      <MockedProvider>
        <ViewBlog blogs={blogs} setselecteMenu={setselecteMenu} setEditblog={setEditblog} />
      </MockedProvider>,
    );

    const searchInput = screen.getByPlaceholderText(/Search by title or URL/i);
    fireEvent.change(searchInput, { target: { value: "Blog 1" } });

    expect(screen.getByText(/Blog 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Blog 2/i)).toBeNull();
  });

  it("calls setEditblog and setselecteMenu on edit click", () => {
    render(
      <MockedProvider>
        <ViewBlog blogs={blogs} setselecteMenu={setselecteMenu} setEditblog={setEditblog} />
      </MockedProvider>,
    );

    const deleteBtn = screen.getByTestId("edit-btn-1");
    fireEvent.click(deleteBtn);

    expect(setEditblog).toHaveBeenCalledWith(blogs[0]);
    expect(setselecteMenu).toHaveBeenCalledWith("Add Products");
  });

  it("calls removeBlog mutation on delete", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <ViewBlog blogs={blogs} setselecteMenu={setselecteMenu} setEditblog={setEditblog} />
      </MockedProvider>,
    );

    const deleteBtn = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockRemoveBlog).toHaveBeenCalled();
    });
  });

  it("calls setselecteMenu on add blog button click", () => {
    render(
      <MockedProvider>
        <ViewBlog blogs={blogs} setselecteMenu={setselecteMenu} setEditblog={setEditblog} />
      </MockedProvider>,
    );

    const addButton = screen.getByText(/Add Blog/i);
    fireEvent.click(addButton);

    expect(setselecteMenu).toHaveBeenCalledWith("Add Products");
    expect(setEditblog).toHaveBeenCalledWith(undefined);
  });
});
