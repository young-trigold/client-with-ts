import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import AddIcon from '../../../static/icon/plus.png';
import { message } from '../../Message/Message';
import Modal from '../../common/Modal';
import { Input } from '../../common/Input';
import { Button, StyledButtonBar } from '../../common/Button';

const AddNoteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  padding: 0.5em 0;
  background-color: ${(props) => props.theme.foregroundColor};

  &:hover {
    background-color: ${(props) => props.theme.surfaceColor};
  }

  &:active {
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

function NewNoteOption() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');

  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setTitle('');
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    if (title) {
      try {
        await axios.post(
          '/api/notes',
          { title },
          {
            headers: {
              contentType: 'application/json',
            },
          },
        );
        message.success('创建成功!');
        window.location.reload(false);
      } catch (error) {
        message.error(error?.response?.data?.message || error.message);
      }
    } else {
      message.warn('笔记标题不能为空!');
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) {
      setTitle(value);
    }
  };

  return (
    <>
      <AddNoteButton type="button" onClick={handleClick}>
        <img src={AddIcon} alt="添加笔记" width="20" />
      </AddNoteButton>
      <Modal isVisible={isModalVisible}>
        <div>
          <span>笔记标题:</span>
          <Input size="10" maxLength="20" onChange={handleInputChange} />
        </div>
        <StyledButtonBar>
          <Button onClick={handleSubmit}>提交</Button>
          <Button onClick={handleCancel} state="dange">
            取消
          </Button>
        </StyledButtonBar>
      </Modal>
    </>
  );
}

export default NewNoteOption;
