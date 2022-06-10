import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';

import { message } from '../Message/Message';
import { validateName, validatePwd } from './validate';
import { Input } from '../common/Input';
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

const StyledTogglePwdIsVisibleButton = styled.button`
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

export interface LoginModalProps {
  isLoginModalVisible: boolean;
  setIsLoginModalVisible: Function;
}

const LoginModal = (props: LoginModalProps) => {
  const { isLoginModalVisible, setIsLoginModalVisible } = props;
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const togglePwdIsVisible = () => {
    setIsPwdVisible(!isPwdVisible);
  };

  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setIsLoginModalVisible(false);
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
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
        setIsLoginModalVisible(false);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      }
    };

    if (validateName(name) && validatePwd(pwd)) login();
  };

  return (
    <Modal isModalVisible={isLoginModalVisible}>
      <StyledCancelButton type="button" onClick={() => setIsLoginModalVisible(false)}>
        <img src={CancelIcon} alt="取消" width="18" />
      </StyledCancelButton>
      <form>
        <div style={{ margin: '0.5em 0' }}>
          <div>用户名:</div>
          <Input value={name} onChange={handleNameChange} maxLength={10} placeholder="昵称" />
        </div>
        <div style={{ margin: '0.5em 0' }}>
          <div>密码:</div>
          <PwdInputContainer>
            <Input
              value={pwd}
              type={isPwdVisible ? 'text' : 'password'}
              maxLength={16}
              placeholder="12345678"
              onChange={handlePwdChange}
            />
            <StyledTogglePwdIsVisibleButton type="button" onClick={togglePwdIsVisible}>
              <img alt="眼睛开合" src={isPwdVisible ? EyeOpen : EyeClose} width="16" />
            </StyledTogglePwdIsVisibleButton>
          </PwdInputContainer>
        </div>
      </form>

      <StyledButtonBar>
        <Button onClick={handleLogin}>登录</Button>
        <Button onClick={handleRegister}>注册</Button>
      </StyledButtonBar>
    </Modal>
  );
};

export default LoginModal;
