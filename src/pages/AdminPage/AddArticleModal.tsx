import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { message } from '../../components/Message/Message';
import { StyledButtonBar, Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { Upload } from '../../components/Input';
import debounce from '../../utils/debounce';

export interface AddArticleModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentOption: string;
}

function AddArticleModal(props: AddArticleModalProps) {
  const { isModalVisible, currentOption, setIsModalVisible } = props;

  const [file, setFile] = useState<File>();

  const handleUploadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) setFile(event.target.files[0]);
    },
    [setFile],
  );

  const handleSubmit = useCallback(
    debounce(() => {
      if (!file) return message.warn('文件不能为空!');

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
    }, 200),
    [file],
  );

  const handleCancel = useCallback(
    debounce(() => {
      setIsModalVisible(false);
      setFile(undefined);
    }, 200),
    [setIsModalVisible, setFile],
  );

  return (
    <Modal isModalVisible={isModalVisible}>
      <form style={{ width: '100%', textAlign: 'center' }}>
        <Upload accept=".md" onChange={handleUploadChange} title="上传文章" file={file} />

        <StyledButtonBar>
          <Button onClick={handleSubmit}>提交</Button>
          <Button onClick={handleCancel} state="dange">
            取消
          </Button>
        </StyledButtonBar>
      </form>
    </Modal>
  );
}

export default React.memo(AddArticleModal);
