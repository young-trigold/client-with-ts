import { useEffect } from 'react';

const useDocumentTitle = (title = '') => {
  document.title = title;

  const handlePageVisible = () => {
    if (document.visibilityState === 'hidden') {
      document.title = '再待一会儿呗~';
    } else {
      document.title = title;
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handlePageVisible);

    return () => document.removeEventListener('visibilitychange', handlePageVisible);
  }, [title]);
};

export default useDocumentTitle;
