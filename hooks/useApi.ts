import { useState } from "react";
type UseApiResponseType = {
  isLoading: boolean;
  isLoaded: boolean;
  data: any;
  error: any;
  callApi: (...params: any[]) => Promise<void>;
};
export function useApi(apiFunction: Function): UseApiResponseType {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState<any>(null);
  const callApi = async (...params: any[]) => {
    setIsLoading(true);
    try {
      const res = await apiFunction(...params);
      setData(res);
      setIsLoaded(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isLoaded, data, error, callApi };
}
