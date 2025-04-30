import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    setIsLoading(true);
    const response = await fetch(url);
    const result = await response.json();
    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  //   return [data];
  return { data, isLoading };
}

export default useFetch;
