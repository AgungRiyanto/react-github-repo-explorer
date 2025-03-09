import { useState } from "react";
import { Octokit } from "@octokit/core";
import { RequestParameters } from "@octokit/core/dist-types/types";

const octokit = new Octokit({});

type OcokitError = {
  status?: number;
  response?: { message?: string };
  code?: string;
  message?: string;
};

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
    } catch (err: unknown) {
      const error = err as OcokitError;
      setError(error.message || "");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchGitHubData };
};

export default useGitHubAPI;
