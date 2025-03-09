import { act } from "react-test-renderer";
import useGitHubAPI from "@/services/useGithubAPI";
import { IUser } from "@/interfaces/user.interface";
import { renderHook } from "@testing-library/react"; // Comes with React 18+ testing utilities
import useGetUserList from "@/hooks/useGetUserList";

// Mock useGitHubAPI
jest.mock("@/services/useGithubAPI");

describe("useGetUserList Hook", () => {
  const mockFetchGitHubData = jest.fn();
  const mockResponse = {
    items: [{ id: 1, login: "octocat" }] as IUser[],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGitHubAPI as jest.Mock).mockReturnValue({
      data: mockResponse,
      error: null,
      loading: false,
      fetchGitHubData: mockFetchGitHubData,
    });
  });

  it("should return initial state correctly", () => {
    const { result } = renderHook(() => useGetUserList());

    expect(result.current.data).toEqual(mockResponse.items);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should call fetchGitHubData with correct parameters", () => {
    const { result } = renderHook(() => useGetUserList());

    act(() => {
      result.current.fetchUser("test-query");
    });

    expect(mockFetchGitHubData).toHaveBeenCalledWith("/search/users", {
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
      q: "test-query",
      per_page: 5,
    });
  });
});
