// src/components/Dashboard/products/__tests__/ViewProduct.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ViewProduct from "../ViewProduct";
import { IProduct } from "types/prod";
import { vi } from "vitest";

// Mocks
vi.mock("next-auth/react", () => ({
   useSession: () => ({ data: { user: { name: "Admin" } } }),
}));

// Mock Apollo Client mutation
vi.mock('@apollo/client', async (importOriginal) => {
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

vi.mock("sweetalert2", () => ({
   __esModule: true,
   default: {
      fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
   },
   fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
}));

vi.mock("components/Toaster/Toaster", () => ({
   __esModule: true,
   default: vi.fn(),
}));

// Simple mock for Table so we can see the rows
vi.mock("components/ui/table", () => ({
   __esModule: true,
   // eslint-disable-next-line
   default: ({ data }: any) => (
      <table>
         <tbody>
            {data.map((item: IProduct) => (
               <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
               </tr>
            ))}
         </tbody>
      </table>
   ),
}));

describe("ViewProduct Component", () => {
   const mockProducts: IProduct[] = [
      {
         id: 1,
         name: "Product A",
         description: "Description A",
         price: 100,
         discountPrice: 90,
         stock: 10,
         status: 'DRAFT',
         createdAt: new Date('2025-08-08T10:00:00.000Z'),
         updatedAt: new Date('2025-08-08T10:00:00.000Z'),
         last_editedBy: "Admin",
         category: { id: 1, name: "Cat A", custom_url: "cat-a" },
         subcategory: { id: 1, name: "Sub A", custom_url: "sub-a" },
         custom_url: "prod-a",
         posterImageUrl: { imageUrl: "https://example.com/img.jpg", public_id: "img1" },
         productImages: [{ imageUrl: "https://example.com/img.jpg", public_id: "img1" }, { imageUrl: "https://example.com/img.jpg", public_id: "img1" }]
      },
   ];

   const setProducts = vi.fn();
   const setselecteMenu = vi.fn();
   const setEditProduct = vi.fn();

   it("renders products in table", () => {
      render(
         <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("DRAFT")).toBeInTheDocument();
   });

   it("filters products by search", () => {
      render(
         <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      fireEvent.change(screen.getByPlaceholderText(/Search Product/i), {
         target: { value: "Product A" },
      });

      expect(screen.getByText("Product A")).toBeInTheDocument();
   });

   it("shows 'No products found' if empty", () => {
      render(
         <ViewProduct
            products={[]}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      expect(screen.getByText(/No products found/i)).toBeInTheDocument();
   });

   it("clicks Add Products when permission is true", () => {
      render(
         <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      fireEvent.click(screen.getByText(/Add Products/i));
      expect(setselecteMenu).toHaveBeenCalledWith("Add Products");
   });

   it('triggers edit action', async () => {
      render(
         <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      // trigger edit
      fireEvent.click(await screen.findByLabelText(/Edit Product/i));

      await waitFor(() => {
         expect(setProducts).toHaveBeenCalled();
      });
   });


   it("confirms delete and calls setProducts", async () => {
      render(
         <ViewProduct
            products={mockProducts}
            setProducts={setProducts}
            setselecteMenu={setselecteMenu}
            setEditProduct={setEditProduct}
         />
      );

      // trigger delete
       fireEvent.click(await screen.findByLabelText(/Delete Product/i));

      await waitFor(() => {
         expect(setProducts).toHaveBeenCalled();
      });
   });
});
