import React, { useCallback, useState } from 'react';

import { Button } from '../Button';
import LoginModal from './LoginModal';

const LoginButton = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoginModalVisible(!isLoginModalVisible);
  }, [setIsLoginModalVisible, isLoginModalVisible]);

  return (
    <>
      <Button buttonType="outlined" onClick={handleClick}>
        登录
      </Button>
      <LoginModal
        isLoginModalVisible={isLoginModalVisible}
        setIsLoginModalVisible={setIsLoginModalVisible}
      />
    </>
  );
};

export default React.memo(LoginButton);
