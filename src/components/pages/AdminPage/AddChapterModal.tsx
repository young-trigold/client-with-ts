import { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import { FileInput } from '../../common/Input';
import Modal from '../../common/Modal';
import { DangeButton, StyledButtonBar, TextButton } from '../../common/Button';

function AddChapterModal(props) {
  const { isVisible, currentOption, setIsVisible } = props;

  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
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
          window.location.reload(false);
        } catch (error) {
          message.error(error?.response?.data?.message || error.message);
        }
      };

      postChapter();
    } else {
      message.warn('文件不能为空!');
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setFile(null);
  };

  return (
    <Modal isVisible={isVisible}>
      <FileInput accept=".md" onChange={handleFileInputChange} title="上传章节" file={file} />
      <StyledButtonBar>
        <TextButton handler={handleSubmit} title="提交" />
        <DangeButton handler={handleCancel} title="取消" />
      </StyledButtonBar>
    </Modal>
  );
}

export default AddChapterModal;
