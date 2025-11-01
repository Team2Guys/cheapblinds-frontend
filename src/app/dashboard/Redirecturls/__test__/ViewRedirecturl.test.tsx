import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ViewRedirecturl from "../ViewRedirecturl";
import { vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { REMOVE_REVIEW } from "@graphql/mutations";
import { RedirectUrls } from "@/types/general";

// Mock useMutation
const mockMutate = vi.fn();
vi.mock("@apollo/client", async (importOriginal) => {
  // eslint-disable-next-line
  const actual: any = await importOriginal();
  return {
    ...actual,
    useMutation: vi.fn(() => [mockMutate, { loading: false }]),
  };
});

// Mock next-auth session
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
            canDeleteRedirecturls: true,
            canAddRedirecturls: true,
            canEditRedirecturls: true,
          },
        },
      },
    })),
  };
});

// Mock Swal
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

// Mock helper functions
vi.mock("@components/ServerActons/ServerAction", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("@utils/permissionHandlers", () => ({
  getPermission: vi.fn(() => true),
}));

vi.mock("@utils/helperFunctions", () => ({
  DateFormatHandler: vi.fn((date) => date.toISOString()),
}));

const mocks = [
  {
    request: {
      query: REMOVE_REVIEW,
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

describe("ViewRedirecturl Component", () => {
  const mockSetMenu = vi.fn();
  const mockSetRedirect = vi.fn();
  const redirectUrls: RedirectUrls[] = [
    {
      id: 1,
      url: "https://example.com/1",
      redirectedUrl: "https://redirected.com/1", // ✅ add this
      createdAt: "2025-08-20T00:00:00Z",
      updatedAt: "2025-08-21T00:00:00Z",
    },
    {
      id: 2,
      url: "https://example.com/2",
      redirectedUrl: "https://redirected.com/2", // ✅ add this
      createdAt: "2025-08-19T00:00:00Z",
      updatedAt: "2025-08-20T00:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      data: { accessToken: "token123" },
      status: "authenticated",
      // eslint-disable-next-line
    } as any);
    mockMutate.mockReset();
  });

  it("renders input and table", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ViewRedirecturl
          Redirecturls={redirectUrls}
          setselecteMenu={mockSetMenu}
          setRedirectUrls={mockSetRedirect}
        />
      </MockedProvider>,
    );

    expect(screen.getByPlaceholderText(/Search Review/i)).toBeInTheDocument();
    expect(screen.getByText("https://example.com/1")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/2")).toBeInTheDocument();
  });

  it("filters table based on search", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ViewRedirecturl
          Redirecturls={redirectUrls}
          setselecteMenu={mockSetMenu}
          setRedirectUrls={mockSetRedirect}
        />
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText(/Search Review/i);
    fireEvent.change(input, { target: { value: "example.com/1" } });

    expect(screen.getByText("https://example.com/1")).toBeInTheDocument();
    expect(screen.queryByText("https://example.com/2")).toBeNull();
  });

  it("calls setselecteMenu and setRedirectUrls on Add Review click", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ViewRedirecturl
          Redirecturls={redirectUrls}
          setselecteMenu={mockSetMenu}
          setRedirectUrls={mockSetRedirect}
        />
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Add Review/i));
    expect(mockSetMenu).toHaveBeenCalledWith("Add RedirectUrls");
    expect(mockSetRedirect).toHaveBeenCalledWith(undefined);
  });

  it("triggers edit action", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewRedirecturl
          Redirecturls={redirectUrls}
          setselecteMenu={mockSetMenu}
          setRedirectUrls={mockSetRedirect}
        />
      </MockedProvider>,
    );

    const deleteBtn = screen.getByTestId("edit-btn-1");
    fireEvent.click(deleteBtn);

    expect(mockSetRedirect).toHaveBeenCalled();
    expect(mockSetMenu).toHaveBeenCalledWith("Add RedirectUrls");
  });

  it("calls mutation on delete", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewRedirecturl
          Redirecturls={redirectUrls}
          setselecteMenu={mockSetMenu}
          setRedirectUrls={mockSetRedirect}
        />
      </MockedProvider>,
    );

    const deleteBtn = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockSetRedirect).toHaveBeenCalled();
    });
  });
});
