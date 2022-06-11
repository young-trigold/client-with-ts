import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addMessage, clearMessage } from './messagesSlice';
import store, { RootState } from '../../app/store';
import CancelIcon from '../../static/icon/cancel.png';

const StyledMessageList = styled.div`
  position: fixed;
  z-index: 4;
  top: 3em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledCancelButton = styled.button`
  padding: 0;
  margin-left: 2em;
  border: none;
  transition: all 0.3s;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface MessageProps {
  title?: string;
  state?: string;
  visible?: boolean;
  [key: string]: any;
}

const StyledMessage = styled.div<MessageProps>`
  margin: 0.5em 1em;
  border-radius: 4px;
  box-shadow: 1px 1px 3px ${(props) => props.theme.shadowColor};
  background-color: ${(props) => props.theme.surfaceColor};
  color: ${(props) => () => {
    if (props.state === 'warn') {
      return props.theme.warnColor;
    }
    if (props.state === 'error') {
      return props.theme.dangeColor;
    }

    if (props.state === 'success') {
      return props.theme.successColor;
    }

    return props.theme.primaryColor;
  }};
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  padding: 0.5em 1em;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
`;

const Message = (props: MessageProps) => {
  const { title, state } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      store.dispatch(clearMessage());
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setVisible(false);
  };

  return (
    <StyledMessage visible={visible} state={state}>
      <div>{String(title)}</div>
      <StyledCancelButton type="button" onClick={handleClick}>
        <img src={CancelIcon} alt="关闭" width="14" />
      </StyledCancelButton>
    </StyledMessage>
  );
};

const MessageList = () => {
  const messages = useSelector((state: RootState) => state.messages.value);

  return (
    <StyledMessageList>
      {messages.map((message) => (
        <Message key={Math.random().toString(36)} title={message.title} state={message.state} />
      ))}
    </StyledMessageList>
  );
};

const message = {
  info(title: string) {
    store.dispatch(addMessage({ title }));
  },
  warn(title: string) {
    store.dispatch(addMessage({ title, state: 'warn' }));
  },
  success(title: string) {
    store.dispatch(addMessage({ title, state: 'success' }));
  },
  error(title: string) {
    store.dispatch(addMessage({ title, state: 'error' }));
  },
};

export { MessageList, message };
