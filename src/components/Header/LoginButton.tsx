import { useState } from 'react';

import { Button } from '../common/Button';
import LoginModal from './LoginModal';

function LoginButton() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const handleClick = () => {
    setIsLoginModalVisible(true);
  };

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
}

export default LoginButton;
