import { useState, useEffect } from 'react';
import axios from 'axios';

import { message } from '../components/Message/Message';

const useLoadResource = <T>(url = '') => {
  const [resource, setResource] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setResource(res.data);
    } catch (error) {
      if (axios.isAxiosError(error))
        return message.error((error.response?.data as { message: string })?.message);
      if (error instanceof Error) return message.error(error.message);
      return message.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { resource, loading };
};

export default useLoadResource;
