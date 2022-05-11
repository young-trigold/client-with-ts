import { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import { DangeButton, StyledButtonBar, TextButton } from '../../common/Button';
import Modal from '../../common/Modal';
import { FileInput } from '../../common/Input';

function AddArticleModal(props) {
  const { isVisible, currentOption, setIsVisible } = props;
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
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
      <div>
        <FileInput accept=".md" onChange={handleFileInputChange} title="上传文章" file={file} />
      </div>
      <StyledButtonBar>
        <TextButton handler={handleSubmit} title="提交" />
        <DangeButton handler={handleCancel} title="取消" />
      </StyledButtonBar>
    </Modal>
  );
}

export default AddArticleModal;
