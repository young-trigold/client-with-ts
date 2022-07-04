import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { message } from '../../components/Message/Message';
import { Upload } from '../../components/Input';
import Modal from '../../components/Modal';
import { StyledButtonBar, Button } from '../../components/Button';

import { NoteOption } from './AdminPage';

export interface AddChapterModalProps {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  currentOption: NoteOption;
}

function AddChapterModal(props: AddChapterModalProps) {
  const { isModalVisible, currentOption, setIsModalVisible } = props;

  const [file, setFile] = useState<File>();

  const handleUploadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) setFile(event.target.files[0]);
    },
    [setFile],
  );

  const handleSubmit = useCallback(() => {
    if (!file) return message.warn('文件不能为空!');

    const formData = new FormData();
    formData.append('file', file);

    const postChapter = async () => {
      try {
        await axios.post(`/api/notes/${currentOption._id}/${Date.now()}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        message.success('章节上传成功!');
        window.location.reload();
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      }
    };

    postChapter();
  }, [file]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setFile(undefined);
  }, [setIsModalVisible, setFile]);

  return (
    <Modal isModalVisible={isModalVisible}>
      <form style={{ width: '100%', textAlign: 'center' }}>
        <Upload accept=".md" onChange={handleUploadChange} title="上传章节" file={file} />
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

export default React.memo(AddChapterModal);
