import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingIndicator from '../../components/LoadingIndicator';
import { message } from '../../components/Message/Message';
import getUserToken from '../../utils/getUserToken';
import AdminPage from './AdminPage';

function ProtectPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userToken = getUserToken();

      if (!userToken) {
        setLoading(false);
        return message.warn('请先登录!');
      }

      try {
        const res = await axios.get('/api/validateRole', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const user = res.data;
        if (user.role === 'admin') setIsAdmin(true);
        else message.warn('权限不足!');
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setLoading, setIsAdmin]);

  if (loading) return <LoadingIndicator text="正在验证身份" />;

  if (isAdmin) return <AdminPage />;

  return <Navigate to="/" replace />;
}

export default ProtectPage;
