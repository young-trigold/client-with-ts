import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import Modal from '../../common/Modal';
import AddIcon from '../../../static/icon/plus.png';
import { TextInput, FileInput } from '../../common/Input';
import { Button, StyledButtonBar } from '../../common/Button';

const AddTagButton = styled.button`
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

function NewTagOption() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState('');

  const handleClick = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCancel = () => {
    setFile(null);
    setTag('');
    setIsModalVisible(false);
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (tag) {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tag', tag);
        formData.append('date', new Date().toLocaleDateString());

        const postChapter = async () => {
          try {
            await axios.post('/api/articles/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            message.success('上传成功!');
            window.location.reload(false);
          } catch (error) {
            message.error(error?.response?.data?.message || error.message);
          }
        };

        postChapter();
      } else {
        message.warn('文章不能为空!');
      }
    } else {
      message.warn('标签不能为空!');
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value) {
      setTag(value);
    }
  };

  return (
    <>
      <AddTagButton type="button" onClick={handleClick}>
        <img src={AddIcon} alt="添加标签" width="20" />
      </AddTagButton>
      <Modal isVisible={isModalVisible}>
        <div style={{ marginBottom: '1em' }}>
          <span>标签名称:</span>
          <TextInput size="10" maxLength="10" onChange={handleInputChange} />
        </div>

        <div>
          <FileInput accept=".md" onChange={handleFileInputChange} title="上传文章" file={file} />
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

export default NewTagOption;
