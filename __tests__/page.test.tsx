import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import useGetUserList from "@/hooks/useGetUserList";
import useGetRepositoryList from "@/hooks/useGetRepositoryList";

// Mock hooks
jest.mock("@/hooks/useGetUserList");
jest.mock("@/hooks/useGetRepositoryList");

describe("Home Page", () => {
  it("renders search input and title", () => {
    useGetUserList.mockReturnValue({
      data: [],
      error: null,
      loading: false,
      fetchUser: jest.fn(),
    });

    useGetRepositoryList.mockReturnValue({
      data: [],
      loading: false,
      fetchRepository: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText("Github Repository Explorer")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls fetchUser when searching for a user", async () => {
    const mockFetchUser = jest.fn();
    useGetUserList.mockReturnValue({
      data: [],
      error: null,
      loading: false,
      fetchUser: mockFetchUser,
    });

    useGetRepositoryList.mockReturnValue({
      data: [],
      loading: false,
      fetchRepository: jest.fn(),
    });

    render(<Home />);

    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "octocat" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(mockFetchUser).toHaveBeenCalledWith("octocat"));
  });

  it("displays user list and allows clicking a user to fetch repos", async () => {
    const mockFetchRepository = jest.fn();
    useGetUserList.mockReturnValue({
      data: [{ login: "octocat" }],
      error: null,
      loading: false,
      fetchUser: jest.fn(),
    });

    useGetRepositoryList.mockReturnValue({
      data: [],
      loading: false,
      fetchRepository: mockFetchRepository,
    });

    render(<Home />);

    const userButton = screen.getByText("octocat");
    fireEvent.click(userButton);

    await waitFor(() =>
      expect(mockFetchRepository).toHaveBeenCalledWith("octocat")
    );
  });
});
