import { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import { StyledButtonBar, Button } from '../../common/Button';
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
        <Button onClick={handleSubmit}>提交</Button>
        <Button onClick={handleCancel} state="dange">
          取消
        </Button>
      </StyledButtonBar>
    </Modal>
  );
}

export default AddArticleModal;
