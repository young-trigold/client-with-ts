/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { message } from '../Message/Message';
import { validateName, validatePwd } from './validate';
import { Input } from '../Input';
import Modal from '../Modal';
import { Button, StyledButtonBar } from '../Button';

import CancelIcon from '../../static/icon/cancel.png';
import EyeOpen from '../../static/icon/eye-open.png';
import EyeClose from '../../static/icon/eye-close.png';

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
  bottom: 0.3em;
  right: 1em;
  border: none;
`;

const PwdInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export interface LoginModalProps {
  isLoginModalVisible: boolean;
  setIsLoginModalVisible: Function;
}

const LoginModal = (props: LoginModalProps) => {
  const { isLoginModalVisible, setIsLoginModalVisible } = props;

  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const togglePwdIsVisible = useCallback(() => {
    setIsPwdVisible(!isPwdVisible);
  }, [setIsPwdVisible, isPwdVisible]);

  const [name, setName] = useState('');

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName],
  );

  const [pwd, setPwd] = useState('');

  const handlePwdChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPwd(event.target.value);
    },
    [setPwd],
  );

  const handleRegister = useCallback(() => {
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

        message.success('????????????!');
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
  }, [setIsLoginModalVisible, validateName, name, pwd]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

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

          message.success('????????????!');
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
    },
    [name, pwd, setName, setPwd, setIsLoginModalVisible],
  );

  return (
    <Modal isModalVisible={isLoginModalVisible}>
      <StyledCancelButton
        type="button"
        onClick={useCallback(() => setIsLoginModalVisible(false), [setIsLoginModalVisible])}
      >
        <img src={CancelIcon} alt="??????" width="18" />
      </StyledCancelButton>
      <form onSubmit={handleSubmit}>
        <section style={{ margin: '0.5em 0' }}>
          <label htmlFor="username">
            ?????????:
            <br />
          </label>
          <Input
            id="username"
            value={name}
            onChange={handleNameChange}
            maxLength={10}
            placeholder="??????"
          />
        </section>
        <section style={{ margin: '0.5em 0' }}>
          <PwdInputContainer>
            <label htmlFor="password">
              ??????:
              <br />
            </label>

            <Input
              id="password"
              value={pwd}
              type={isPwdVisible ? 'text' : 'password'}
              maxLength={16}
              placeholder="12345678"
              onChange={handlePwdChange}
            />
            <StyledTogglePwdIsVisibleButton type="button" onClick={togglePwdIsVisible}>
              <img alt="????????????" src={isPwdVisible ? EyeOpen : EyeClose} width="16" />
            </StyledTogglePwdIsVisibleButton>
          </PwdInputContainer>
        </section>
        <StyledButtonBar>
          <Button type="sumit">??????</Button>
          <Button onClick={handleRegister}>??????</Button>
        </StyledButtonBar>
      </form>
    </Modal>
  );
};

export default React.memo(LoginModal);
