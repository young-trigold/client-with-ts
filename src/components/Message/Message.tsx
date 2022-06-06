import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addMessage, clearMessage } from './messagesSlice';
import store from '../../app/store';
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

const getColor = (props) => {
  if (props.tag === 'warn') {
    return props.theme.warnColor;
  }
  if (props.tag === 'error') {
    return props.theme.dangeColor;
  }

  if (props.tag === 'success') {
    return props.theme.successColor;
  }

  return props.theme.secondColor;
};

const StyledMessage = styled.div`
  margin: 0.5em 1em;
  border-radius: 4px;
  box-shadow: 0 0 8px ${(props) => props.theme.shadowColor};
  background-color: ${(props) => props.theme.surfaceColor};
  color: ${(props) => getColor(props)};
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  padding: 0.5em 1em;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
`;

function Message(props) {
  const { title, tag } = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      store.dispatch(clearMessage());
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <StyledMessage isVisible={isVisible} tag={tag}>
      <div>{String(title)}</div>
      <StyledCancelButton type="button" onClick={handleClick}>
        <img src={CancelIcon} alt="关闭" width="14" />
      </StyledCancelButton>
    </StyledMessage>
  );
}

function MessageList() {
  const messages = useSelector((state) => state.messages.value);

  return (
    <StyledMessageList>
      {messages.map((message) => (
        <Message key={Math.random().toString(36)} title={message.title} tag={message.tag} />
      ))}
    </StyledMessageList>
  );
}

const message = {
  info(title) {
    store.dispatch(addMessage({ title }));
  },
  warn(title) {
    store.dispatch(addMessage({ title, tag: 'warn' }));
  },
  success(title) {
    store.dispatch(addMessage({ title, tag: 'success' }));
  },
  error(title) {
    store.dispatch(addMessage({ title, tag: 'error' }));
  },
};

export { MessageList, message };
