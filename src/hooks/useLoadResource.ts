import { useState, useEffect } from 'react';
import axios from 'axios';

import { message } from '../components/Message/Message';

const useLoadResource = (url = '') => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setResource(res.data);
    } catch (error) {
      message.error(error?.response?.data?.message || error.message);
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
