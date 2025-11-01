import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { vi } from "vitest";
import { SessionProvider } from "next-auth/react"; // <-- import this
import { REMOVE_SUBCATEGORY } from "@graphql/categories";
import Swal from "sweetalert2";
import revalidateTag from "@components/ServerActons/ServerAction";
import { ISUBCATEGORY } from "@/types/cat";
import ViewSubcategries from "../ViewSubcategries";

// 🧪 Mocks (keep these as is)
vi.mock("@components/ServerActons/ServerAction", () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve()),
}));

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
            canDeleteSubCategory: true,
            canAddSubCategory: true,
            canEditSubCategory: true,
          },
        },
      },
    })),
  };
});

const mockSubCategories: ISUBCATEGORY[] = [
  {
    id: 1,
    name: "Laptops",
    createdAt: new Date("2025-08-08T10:00:00.000Z"),
    updatedAt: new Date("2025-08-08T10:00:00.000Z"),
    last_editedBy: "admin",
    posterImageUrl: {
      imageUrl: "/img1.jpg",
      public_id: "img1",
      resource_type: "image",
    },
    custom_url: "laptops",
    Canonical_Tag: "",
    Meta_Description: "",
    Meta_Title: "",
    status: "DRAFT",
  },
];

// Apollo mock remains unchanged
const mocks = [
  {
    request: {
      query: REMOVE_SUBCATEGORY,
      variables: { id: 1 },
    },
    result: {
      data: {
        removeSubcategory: {
          id: 1,
        },
      },
    },
  },
];

describe("ViewSubcategries Component", () => {
  it("renders subcategories", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          {" "}
          {/* Wrap here */}
          <ViewSubcategries
            subCategories={mockSubCategories}
            setMenuType={vi.fn()}
            seteditCategory={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    expect(await screen.findByText("Laptops")).toBeInTheDocument();
  });

  it("filters subcategories by search", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewSubcategries
            subCategories={mockSubCategories}
            setMenuType={vi.fn()}
            seteditCategory={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Search Sub Categories");
    fireEvent.change(input, { target: { value: "Lap" } });

    expect(await screen.findByText("Laptops")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Phone" } });
    expect(screen.queryByText("Laptops")).not.toBeInTheDocument();
  });

  it("calls setMenuType when Add Sub Category is clicked", () => {
    const setMenuType = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewSubcategries
            subCategories={mockSubCategories}
            setMenuType={setMenuType}
            seteditCategory={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const addButton = screen.getByText("Add Sub Category");
    fireEvent.click(addButton);

    expect(setMenuType).toHaveBeenCalledWith("Add Sub Categories");
  });

  it("triggers edit action", async () => {
    const seteditCategory = vi.fn();
    const setMenuType = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewSubcategries
            subCategories={mockSubCategories}
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const editIcon = await screen.findByLabelText("Edit Sub Category"); // or your ARIA label
    fireEvent.click(editIcon);

    expect(seteditCategory).toHaveBeenCalled();
    expect(setMenuType).toHaveBeenCalledWith("CategoryForm");
  });

  it("deletes a subcategory after confirmation", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionProvider session={null}>
          <ViewSubcategries
            subCategories={mockSubCategories}
            setMenuType={vi.fn()}
            seteditCategory={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const deleteIcon = await screen.findByLabelText("Delete Sub Category");
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByText("Laptops")).not.toBeInTheDocument();
    });

    expect(revalidateTag).toHaveBeenCalledWith("subcategories");
  });
});
