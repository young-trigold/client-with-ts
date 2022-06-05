/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { Button } from '../common/Button';
import LoginModal from './LoginModal';

function LoginButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <Button onClick={handleClick}>登录</Button>
      <LoginModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
}

export default LoginButton;
