import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import { message } from '../../Message/Message';
import AdminPage from './AdminPage';

function ProtectPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const rawUser = localStorage.getItem('user');
      const user = rawUser && JSON.parse(rawUser);

      if (user) {
        try {
          const res = await axios.get('/api/validateRole', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (res.data.role === 'admin') setIsAdmin(true);
          else message.warn('权限不足!');
        } catch (error) {
          if (axios.isAxiosError(error))
            return message.error((error.response?.data as { message: string })?.message);
          if (error instanceof Error) return message.error(error.message);
          return message.error(JSON.stringify(error));
        } finally {
          setLoading(false);
        }
      } else {
        message.warn('您还没有登录!');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingIndicator text="正在验证身份" />;

  if (isAdmin) return <AdminPage />;

  return <Navigate to="/" replace />;
}

export default ProtectPage;
