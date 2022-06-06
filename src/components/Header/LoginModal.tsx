import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import { message } from '../Message/Message';
import { validateName, validatePwd } from './validate';
import { TextInput } from '../common/Input';
import Modal from '../common/Modal';
import { Button } from '../common/Button';

import CancelIcon from '../../static/icon/cancel.png';
import EyeOpen from '../../static/icon/eye-open.png';
import EyeClose from '../../static/icon/eye-close.png';

const StyledButtonBar = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  margin: 8px 0;
`;

const StyledCancelButton = styled.button`
  position: absolute;
  top: -1em;
  right: -1em;
  border: none;
  background-color: ${(props) => props.theme.surfaceColor};
  padding: 0;
  margin: 0;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border-radius: 14px;
`;

const StyledTogglePwdVisibleButton = styled.button`
  background-color: transparent;
  padding: 0;
  position: absolute;
  right: 1em;
  border: none;
`;

const PwdInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LoginModal = (props) => {
  const { isVisible, setIsVisible } = props;
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const togglePwdVisible = () => {
    setIsPwdVisible(!isPwdVisible);
  };

  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const handleRegister = () => {
    const postUser = async () => {
      try {
        await axios.post(
          '/api/register',
          { name, pwd },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        message.success('注册成功!');
        setIsVisible(false);
      } catch (error) {
        message.error(error?.response?.data?.message || error.message);
      }
    };

    if (validateName(name) && validatePwd(pwd)) {
      postUser();
    }
  };

  const handleLogin = () => {
    const login = async () => {
      try {
        const res = await axios.post(
          '/api/login',
          { name, pwd },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        message.success('登录成功!');
        setName('');
        setPwd('');
        setIsVisible(false);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        message.error(error?.response?.data?.message || error.message);
      }
    };

    if (validateName(name) && validatePwd(pwd)) login();
  };

  return (
    <Modal isVisible={isVisible}>
      <StyledCancelButton type="button" onClick={() => setIsVisible(false)}>
        <img src={CancelIcon} alt="取消" width="18" />
      </StyledCancelButton>
      <div>
        <div>用户名:</div>
        <TextInput value={name} onChange={handleNameChange} maxLength="10" placeholder="昵称" />
      </div>
      <div>
        <div>密码:</div>
        <PwdInputContainer>
          <TextInput
            value={pwd}
            type={isPwdVisible ? 'text' : 'password'}
            maxLength="16"
            minLength="8"
            placeholder="12345678"
            onChange={handlePwdChange}
          />
          <StyledTogglePwdVisibleButton type="button" onClick={togglePwdVisible}>
            <img alt="眼睛开合" src={isPwdVisible ? EyeOpen : EyeClose} width="16" />
          </StyledTogglePwdVisibleButton>
        </PwdInputContainer>
      </div>
      <StyledButtonBar>
        <Button onClick={handleLogin}>登录</Button>
        <Button onClick={handleRegister}>注册</Button>
      </StyledButtonBar>
    </Modal>
  );
}

export default LoginModal;
