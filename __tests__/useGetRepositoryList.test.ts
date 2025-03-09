import { renderHook, act } from "@testing-library/react";
import useGetRepositoryList from "@/hooks/useGetRepositoryList";
import useGitHubAPI from "@/services/useGithubAPI";

jest.mock("@/services/useGithubAPI");

describe("useGetRepositoryList", () => {
  let fetchGitHubDataMock: jest.Mock;

  beforeEach(() => {
    fetchGitHubDataMock = jest.fn();
    (useGitHubAPI as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      loading: false,
      fetchGitHubData: fetchGitHubDataMock,
    });
  });

  it("should return default values", () => {
    const { result } = renderHook(() => useGetRepositoryList());

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should call fetchGitHubData with correct parameters", async () => {
    const { result } = renderHook(() => useGetRepositoryList());

    await act(async () => {
      await result.current.fetchRepository("octocat");
    });

    expect(fetchGitHubDataMock).toHaveBeenCalledWith("/users/octocat/repos", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 5,
    });
  });

  it("should update data when API response is received", () => {
    const mockData = [{ id: 1, name: "repo1" }];

    (useGitHubAPI as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      loading: false,
      fetchGitHubData: fetchGitHubDataMock,
    });

    const { result } = renderHook(() => useGetRepositoryList());

    expect(result.current.data).toEqual(mockData);
  });

  it("should handle API error correctly", () => {
    const mockError = "API Error";

    (useGitHubAPI as jest.Mock).mockReturnValue({
      data: [],
      error: mockError,
      loading: false,
      fetchGitHubData: fetchGitHubDataMock,
    });

    const { result } = renderHook(() => useGetRepositoryList());

    expect(result.current.error).toBe(mockError);
  });
});
