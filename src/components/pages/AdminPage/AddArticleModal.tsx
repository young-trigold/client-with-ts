import React, { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import { StyledButtonBar, Button } from '../../common/Button';
import Modal from '../../common/Modal';
import { Upload } from '../../common/Input';

export interface AddArticleModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentOption: string;
}

function AddArticleModal(props: AddArticleModalProps) {
  const { isModalVisible, currentOption, setIsModalVisible } = props;
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tag', currentOption);
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
    } else {
      message.warn('文件不能为空!');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFile(undefined);
  };

  return (
    <Modal isModalVisible={isModalVisible}>
      <div>
        <Upload accept=".md" onChange={handleUploadChange} title="上传文章" file={file} />
      </div>
      <StyledButtonBar>
        <Button onClick={handleSubmit}>提交</Button>
        <Button onClick={handleCancel} state="dange">
          取消
        </Button>
      </StyledButtonBar>
    </Modal>
  );
}

export default AddArticleModal;
