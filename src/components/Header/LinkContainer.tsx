import { useNavigate } from 'react-router-dom';
import React, { useCallback } from 'react';

import LoginButton from './LoginButton';
import { Button } from '../Button';

function LinkContainer() {
  const navigate = useNavigate();

  const handleNoteClick = useCallback(() => {
    navigate('/notes');
  }, [navigate]);

  const handleArticleClick = () => {
    navigate('/');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <>
      <LoginButton />
      <Button buttonType="link" onClick={handleAdminClick}>
        进入后台
      </Button>
      <Button buttonType="link" onClick={handleArticleClick}>
        我的文章
      </Button>
      <Button buttonType="link" onClick={handleNoteClick}>
        我的笔记
      </Button>
    </>
  );
}

export default React.memo(LinkContainer);
