/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { message } from '../../components/Message/Message';
import Modal from '../../components/Modal';
import { Input, Upload } from '../../components/Input';
import { Button, StyledButtonBar } from '../../components/Button';

import AddIcon from '../../static/icon/plus.png';

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

const NewTagOption = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [tag, setTag] = useState('');

  const handleClick = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [setIsModalVisible]);

  const handleCancel = useCallback(() => {
    setFile(undefined);
    setTag('');
    setIsModalVisible(false);
  }, [setFile, setTag, setIsModalVisible]);

  const handleUploadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) setFile(event.target.files[0]);
    },
    [setFile],
  );

  const handleSubmit = useCallback(async () => {
    if (!tag || !file) return message.warn('文章或标签不能为空!');

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
        window.location.reload();
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      }
    };

    postChapter();
  }, [tag, file]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value) setTag(value);
    },
    [setTag],
  );

  return (
    <>
      <AddTagButton type="button" onClick={handleClick}>
        <img src={AddIcon} alt="添加标签" width="20" />
      </AddTagButton>
      <Modal isModalVisible={isModalVisible}>
        <form style={{ width: '100%', textAlign: 'center' }}>
          <section style={{ marginBottom: '1em' }}>
            <label htmlFor="tag">标签名称:</label>
            <Input id="tag" size={10} maxLength={10} onChange={handleInputChange} />
          </section>

          <Upload accept=".md" onChange={handleUploadChange} title="上传文章" file={file!} />

          <StyledButtonBar>
            <Button onClick={handleSubmit}>提交</Button>
            <Button onClick={handleCancel} state="dange">
              取消
            </Button>
          </StyledButtonBar>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(NewTagOption);
