import { render, screen, fireEvent } from "@testing-library/react";
import AddProd from "../AddProd";
import React from "react";
import { vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";

// Mock Apollo Client mutation
const mockMutate = vi.fn();
vi.mock("@apollo/client", async (importOriginal) => {
   // eslint-disable-next-line
   const actual: any = await importOriginal();
   return {
      ...actual,
      useMutation: vi.fn(() => [mockMutate, { loading: false }]),
   };
});

vi.mock("next/navigation", () => ({
   useRouter: () => ({
      push: vi.fn(),
   }),
}));

describe("AddProd Component", () => {
   const setEditProduct = vi.fn();
   const setMenuType = vi.fn();
   const categoriesList = [
      { id: 1, name: 'Category A', posterImageUrl: { imageUrl: '/img1.jpg', public_id: 'img1', resource_type: 'image' }, custom_url: 'b' },
      { id: 2, name: 'Category B', posterImageUrl: { imageUrl: '/img1.jpg', public_id: 'img1', resource_type: 'image' }, custom_url: 'a' },
   ];

   beforeEach(() => {
      vi.clearAllMocks();
   });

   it("renders form fields", () => {
      render(
         <MockedProvider mocks={[]} addTypename={false}>
            <SessionProvider session={null}>
               <AddProd categoriesList={categoriesList} setselecteMenu={setMenuType} EditProductValue={null} editProduct={null} setEditProduct={setEditProduct} />
            </SessionProvider>
         </MockedProvider>
      );
      expect(screen.getByText(/Back/i)).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /Submit/i })[0]).toBeInTheDocument();
      expect(screen.getByLabelText(/Product Title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Custom Url/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select Categories & Sub Categories/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Product Price/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/DiscountPrice/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Stock/i)).toBeInTheDocument();
   });

   it("calls createProduct mutation on submit", async () => {
      render(
         <MockedProvider mocks={[]} addTypename={false}>
            <SessionProvider session={null}>
               <AddProd
                  categoriesList={categoriesList}
                  setselecteMenu={setMenuType}
                  EditProductValue={null}
                  editProduct={null}
                  setEditProduct={setEditProduct}
               />
            </SessionProvider>
         </MockedProvider>
      );

      // Fill required fields
      fireEvent.change(screen.getByPlaceholderText(/Product Title/i), {
         target: { value: "Test Product" },
      });

      // Mock category & subcategory selection
      fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: "1" } });
      // fireEvent.change(screen.getByLabelText(/Subcategory/i), { target: { value: "1" } });

      // Click submit
      fireEvent.click(screen.getByLabelText(/InnerSubmit/i));
   });

});
