/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { TextButton } from '../common/Button';
import LoginModal from './LoginModal';

function LoginButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <>
      <TextButton handler={handleClick} title="登录" />
      <LoginModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
}

export default LoginButton;
