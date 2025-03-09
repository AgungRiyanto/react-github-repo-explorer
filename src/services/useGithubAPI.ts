import { useState } from "react";
import { Octokit } from "@octokit/core";
import { RequestParameters } from "@octokit/core/dist-types/types";

const octokit = new Octokit({});

const useGitHubAPI = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (
    endpoint: string,
    options?: RequestParameters
  ) => {
    try {
      setData(null);
      setLoading(true);
      setError(null);
      const response = await octokit.request(`GET ${endpoint}`, options);
      setData(response.data);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchGitHubData };
};

export default useGitHubAPI;
