import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddRedirecturl from "../AddRedirecturl";
import { vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";
import { ADD_REDIRECTURLS } from "graphql/mutations";

// --- Mocks for Apollo useMutation
const mockAddRedirectUrls = vi.fn();
const mockUpdateRedirectUrls = vi.fn();

vi.mock("@apollo/client", async (importOriginal) => {
  // eslint-disable-next-line
  const actual: any = await importOriginal();
  return {
    ...actual,
    useMutation: vi
      .fn()
      // eslint-disable-next-line
      .mockImplementation((mutation: any) => {
        if (mutation.name === "ADD_REDIRECTURLS") {
          return [mockAddRedirectUrls, { loading: false }];
        }
        if (mutation.name === "UPDATE_REDIRECTURLS") {
          return [mockUpdateRedirectUrls, { loading: false }];
        }
        return [vi.fn(), { loading: false }];
      }),
  };
});

// Mock next-auth
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

// Mock ServerActions revalidateTag
vi.mock("@components/ServerActons/ServerAction", () => ({
  __esModule: true,
  default: vi.fn(),
  revalidateTag: vi.fn(),
}));

// Mock Toaster
vi.mock("@components/Toaster/Toaster", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mocksAdd = [
  {
    request: {
      query: ADD_REDIRECTURLS,
      variables: {
        CreatedRedirecturls: {
          url: "https://example.com",
          redirectedUrl: "https://redirect.com",
        },
      },
    },
    result: {
      data: {
        addRedirectUrls: {
          id: 1,
          url: "https://example.com",
          redirectedUrl: "https://redirect.com",
        },
      },
    },
  },
];

describe("AddRedirecturl Component", () => {
  const setRedirectUrls = vi.fn();
  const setselecteMenu = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields", () => {
    render(
      <MockedProvider>
        <SessionProvider session={null}>
          <AddRedirecturl
            RedirectUrls={undefined}
            setRedirectUrls={setRedirectUrls}
            setselecteMenu={setselecteMenu}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    expect(screen.getByPlaceholderText("Url")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("redirected Url")).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
  });

  it("calls ADD_REDIRECTURLS mutation on submit", async () => {
    render(
      <MockedProvider mocks={mocksAdd} addTypename={false}>
        <SessionProvider session={null}>
          <AddRedirecturl
            RedirectUrls={undefined}
            setRedirectUrls={setRedirectUrls}
            setselecteMenu={setselecteMenu}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Url"), {
      target: { value: "https://example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("redirected Url"), {
      target: { value: "https://redirect.com" },
    });

    fireEvent.click(screen.getByText("Submit"));
  });

  it("calls UPDATE_REDIRECTURLS mutation on submit when RedirectUrls prop exists", async () => {
    const redirectUrl = {
      id: 1,
      url: "https://old.com",
      redirectedUrl: "https://old-redirect.com",
    };

    render(
      <MockedProvider mocks={mocksAdd} addTypename={false}>
        <SessionProvider session={null}>
          <AddRedirecturl
            RedirectUrls={redirectUrl}
            setRedirectUrls={setRedirectUrls}
            setselecteMenu={setselecteMenu}
          />
        </SessionProvider>
      </MockedProvider>,
    );

    // Change URL
    fireEvent.change(screen.getByPlaceholderText("Url"), {
      target: { value: "https://new.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("redirected Url"), {
      target: { value: "https://new-redirect.com" },
    });

    fireEvent.click(screen.getByText("Submit"));
  });
});
