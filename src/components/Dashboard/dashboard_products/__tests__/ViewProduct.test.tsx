import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { vi } from "vitest";
import { SessionProvider } from "next-auth/react";
import Swal from "sweetalert2";
import { REMOVE_PRODUCT } from "graphql/prod";
import { IProduct } from "types/prod";
import ViewProduct from "../ViewProduct";

// 🧪 Mocks
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
            canDeleteProduct: true,
            canAddProduct: true,
            canEditProduct: true,
          },
        },
      },
    })),
  };
});

const mockProducts: IProduct[] = [
  {
    id: 1,
    name: "Macbook Pro",
    description: "Apple Laptop",
    createdAt: new Date("2025-08-08T10:00:00.000Z"),
    updatedAt: new Date("2025-08-09T10:00:00.000Z"),
    last_editedBy: "admin",
    posterImageUrl: {
      imageUrl: "/macbook.jpg",
      public_id: "img1",
      resource_type: "image",
    },
    price: 2000,
    discountPrice: 1800,
    stock: 5,
    category: {
      id: 10,
      name: "Laptops",
      custom_url: "laptops",
      posterImageUrl: {
        imageUrl: "/macbook.jpg",
        public_id: "img1",
        resource_type: "image",
      },
    },
    subcategory: {
      id: 11,
      name: "Mac",
      custom_url: "mac",
      posterImageUrl: {
        imageUrl: "/macbook.jpg",
        public_id: "img1",
        resource_type: "image",
      },
    },
    custom_url: "macbook-pro",
    status: "PUBLISHED",
    hoverImageUrl: {
      imageUrl: "/macbook.jpg",
      public_id: "img1",
      resource_type: "image",
    },
    productImages: [],
  },
];

const mocks = [
  {
    request: {
      query: REMOVE_PRODUCT,
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

describe("ViewProduct Component", () => {
  it("renders products", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewProduct
            products={mockProducts}
            setProducts={vi.fn()}
            setselecteMenu={vi.fn()}
            setEditProduct={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    expect(await screen.findByText("Macbook Pro")).toBeInTheDocument();
  });

  it("filters products by search", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewProduct
            products={mockProducts}
            setProducts={vi.fn()}
            setselecteMenu={vi.fn()}
            setEditProduct={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Search Product");
    fireEvent.change(input, { target: { value: "Mac" } });
    expect(await screen.findByText("Macbook Pro")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Dell" } });
    expect(screen.queryByText("Macbook Pro")).not.toBeInTheDocument();
  });

  it("calls setselecteMenu when Add Products is clicked", () => {
    const setselecteMenu = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewProduct
            products={mockProducts}
            setProducts={vi.fn()}
            setselecteMenu={setselecteMenu}
            setEditProduct={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const addButton = screen.getByText("Add Products");
    fireEvent.click(addButton);

    expect(setselecteMenu).toHaveBeenCalledWith("Add Products");
  });

  it("triggers edit action", async () => {
    const setEditProduct = vi.fn();
    const setselecteMenu = vi.fn();

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SessionProvider session={null}>
          <ViewProduct
            products={mockProducts}
            setProducts={vi.fn()}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const editIcon = await screen.findByLabelText("Edit Product");
    fireEvent.click(editIcon);

    expect(setEditProduct).toHaveBeenCalled();
    expect(setselecteMenu).toHaveBeenCalledWith("Add Products");
  });

  it("deletes a product after confirmation", async () => {
    const setProducts = vi.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionProvider session={null}>
          <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={vi.fn()}
            setEditProduct={vi.fn()}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    const deleteIcon = await screen.findByLabelText("Delete Product");
    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(setProducts).toHaveBeenCalled();
    });
  });
});
