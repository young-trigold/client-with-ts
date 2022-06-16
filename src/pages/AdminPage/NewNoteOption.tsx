import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import { message } from '../../components/Message/Message';
import Modal from '../../components/Modal';
import { Input } from '../../components/Input';
import { Button, StyledButtonBar } from '../../components/Button';

import AddIcon from '../../static/icon/plus.png';

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
        window.location.reload();
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      }
    } else {
      message.warn('笔记标题不能为空!');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      <Modal isModalVisible={isModalVisible}>
        <div style={{ margin: '1em 0' }}>
          <span>笔记标题:</span>
          <Input size={10} maxLength={20} onChange={handleInputChange} />
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