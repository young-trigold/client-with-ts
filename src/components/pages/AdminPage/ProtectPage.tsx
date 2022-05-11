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
      const user = JSON.parse(localStorage.getItem('user'));

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
          message.error(error?.response?.data?.message || error.message);
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

  if (loading) return (<LoadingIndicator text="正在验证身份" />);

  if (isAdmin) return (<AdminPage />);

  return (<Navigate to="/" replace />);
}

export default ProtectPage;
