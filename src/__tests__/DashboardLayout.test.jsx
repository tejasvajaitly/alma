import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardLayout from "@/app/dashboard/layout.tsx";
import { usePathname } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the @clerk/nextjs module
jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }) => <div data-testid="signed-in">{children}</div>,
  UserButton: () => <div data-testid="user-button">User Button</div>,
}));

describe("DashboardLayout", () => {
  const renderComponent = (pathname) => {
    usePathname.mockReturnValue(pathname);
    return render(
      <DashboardLayout>
        <div>Child content</div>
      </DashboardLayout>
    );
  };

  it("renders the logo", () => {
    renderComponent("/dashboard");
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.svg");
  });

  it("renders navigation links", () => {
    renderComponent("/dashboard");
    expect(screen.getByText("Leads")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("applies bold style to active link", () => {
    renderComponent("/dashboard");
    const leadsLink = screen.getByText("Leads");
    expect(leadsLink).toHaveClass("font-bold");
  });

  it("renders SignedIn component", () => {
    renderComponent("/dashboard");
    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
  });

  it("renders UserButton", () => {
    renderComponent("/dashboard");
    expect(screen.getByTestId("user-button")).toBeInTheDocument();
  });

  it("renders Admin text", () => {
    renderComponent("/dashboard");
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders children content", () => {
    renderComponent("/dashboard");
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
