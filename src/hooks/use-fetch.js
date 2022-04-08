import { useState, useCallback } from "react";

const useFetchTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentHTTP = useCallback(async (requestCongfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestCongfig.url, {
        method: requestCongfig.method ? requestCongfig.method : "GET",
        headers: requestCongfig.headers ? requestCongfig.headers : {},
        body: requestCongfig.body ? JSON.stringify(requestCongfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sentHTTP,
  };
};

export default useFetchTask;
