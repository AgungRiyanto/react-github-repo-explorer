import useGitHubAPI from "@/services/useGithubAPI";
import { IUser } from "@/interfaces/user.interface";

const useGetUserList = () => {
  const {
    data: response,
    error,
    loading,
    fetchGitHubData,
  } = useGitHubAPI<{ items: IUser[] }>();
  const data = response?.items || [];

  const fetchUser = async (q: string) => {
    fetchGitHubData("/search/users", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q,
      per_page: 5,
    });
  };

  return {
    data,
    error,
    loading,
    fetchUser,
  };
};

export default useGetUserList;
