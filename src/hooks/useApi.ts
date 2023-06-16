import { useEffect, useState } from 'react';

export interface ApiHookState<T> {
  data: T | undefined;
  isLoading: boolean;
}

const useApi = <T>(url: string): ApiHookState<T> => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ data, setData ] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (!url) return;

    const fetchData = async (): Promise<void> => {
      const response = await fetch(url);
      // Yes, I added artifical lag to highlight the loading spinner :)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await response.json();
      setData(data);
      setLoading(false);
    };

    fetchData()
      .catch((error) => console.error(error));
  }, [ url ]);

  return { isLoading: loading, data };
};

export { useApi };
