import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestAPI = useCallback(async (applyData) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
      );
      if (!res.ok) {
        throw new Error("Request failed!");
      }
      const data = await res.json();
      applyData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);
  return {
    error,
    loading,
    requestAPI,
  };
};

export default useHttp;
