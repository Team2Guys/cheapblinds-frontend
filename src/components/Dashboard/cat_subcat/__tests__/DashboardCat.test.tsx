// __tests__/DashboardCat.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Category } from "types/cat";
import { MockedProvider } from "@apollo/client/testing";
import Swal from "sweetalert2";
import DashboardCat from "../dashboard_cat";
import { REMOVE_CATEGORY } from "../../../../graphql/categories";
import { vi } from "vitest";
import revalidateTag from "@components/ServerActons/ServerAction";

// Partial mock for next-auth/react (SessionProvider + useSession)
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
            canDeleteCategory: true,
            canAddCategory: true,
            canEditCategory: true,
          },
        },
      },
    })),
  };
});

vi.mock("@components/ServerActons/ServerAction", () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve()),
}));

// Fix for SweetAlert2 mocking
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

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "All electronics",
    custom_url: "electronics",
    posterImageUrl: {
      imageUrl: "/img1.jpg",
      public_id: "img1",
      resource_type: "image",
    },
    createdAt: new Date("2025-08-08T10:00:00.000Z"),
    updatedAt: new Date("2025-08-08T10:00:00.000Z"),
    last_editedBy: "admin",
    Canonical_Tag: "",
    Meta_Description: "",
    Meta_Title: "",
    status: "DRAFT",
    seoSchema: "",
    subCategories: [],
  },
];

const mocks = [
  {
    request: {
      query: REMOVE_CATEGORY,
      variables: { id: 1 },
    },
    result: {
      data: {
        removecategory: {
          id: 1,
        },
      },
    },
  },
];

describe("DashboardCat Component", () => {
  it("renders categories correctly", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DashboardCat cetagories={mockCategories} setMenuType={vi.fn()} seteditCategory={vi.fn()} />
      </MockedProvider>,
    );

    expect(await screen.findByText("Electronics")).toBeInTheDocument();
  });

  it("filters categories based on search input", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DashboardCat cetagories={mockCategories} setMenuType={vi.fn()} seteditCategory={vi.fn()} />
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Search Category");
    fireEvent.change(input, { target: { value: "Electronics" } });
    expect(await screen.findByText("Electronics")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Clothing" } });
    expect(screen.queryByText("Electronics")).not.toBeInTheDocument();
  });

  it("calls setMenuType when Add Category is clicked", () => {
    const setMenuType = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DashboardCat
          cetagories={mockCategories}
          setMenuType={setMenuType}
          seteditCategory={vi.fn()}
        />
      </MockedProvider>,
    );

    const addButton = screen.getByText("Add Category");
    fireEvent.click(addButton);

    expect(setMenuType).toHaveBeenCalledWith("Add Category");
  });

  it("calls seteditCategory and setMenuType on Edit", async () => {
    const setMenuType = vi.fn();
    const seteditCategory = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DashboardCat
          cetagories={mockCategories}
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
        />
      </MockedProvider>,
    );

    const editIcon = await screen.findByLabelText("Edit Category");
    fireEvent.click(editIcon);

    expect(seteditCategory).toHaveBeenCalled();
    expect(setMenuType).toHaveBeenCalledWith("CategoryForm");
  });

  it("deletes a category on confirm", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DashboardCat cetagories={mockCategories} setMenuType={vi.fn()} seteditCategory={vi.fn()} />
      </MockedProvider>,
    );

    const deleteIcon = await screen.findByLabelText("Delete Category");
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByText("Electronics")).not.toBeInTheDocument();
    });

    expect(revalidateTag).toHaveBeenCalledWith("categories");
  });
});
