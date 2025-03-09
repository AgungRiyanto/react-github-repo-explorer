import useGitHubAPI from "@/services/useGithubAPI";
import { IRepository } from "@/interfaces/repository.interface";

const useGetRepositoryList = () => {
  const { data, error, loading, fetchGitHubData } = useGitHubAPI<
    IRepository[] | []
  >();

  const fetchRepository = async (username: string) => {
    fetchGitHubData(`/users/${username}/repos`, {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      per_page: 5,
    });
  };

  return {
    data: data || [],
    error,
    loading,
    fetchRepository,
  };
};

export default useGetRepositoryList;
