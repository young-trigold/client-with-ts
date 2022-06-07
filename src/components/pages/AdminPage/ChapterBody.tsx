import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import { StyledTable, StyledRow } from './StyledTable';
import { IconButton, Button } from '../../common/Button';
import AddChapterModal from './AddChapterModal';
import { message } from '../../Message/Message';

import AddIcon from '../../../static/icon/plus.png';
import CancelIcon from '../../../static/icon/cancel.png';

const StyledChapterBody = styled.main`
  flex: 8;
  overflow: auto;
  background-color: ${(props) => props.theme.backgroundColor};

  & > button {
    position: fixed;
    bottom: 50px;
    right: 2em;
    z-index: 0;
  }
`;

function AddButton(props) {
  const { currentOption } = props;
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <IconButton
        icon={isVisible ? CancelIcon : AddIcon}
        width={24}
        description="添加"
        handler={handleClick}
      />
      <AddChapterModal
        isVisible={isVisible}
        currentOption={currentOption}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

function ChapterBody(props) {
  const { currentIndex, chapters, noteOptions } = props;

  const deleteItem = (chapterId) => {
    const deleteChapter = async () => {
      try {
        await axios.delete(`/api/notes/${noteOptions[currentIndex]._id}/${chapterId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
          },
        });

        message.success('删除成功!');
        window.location.reload(false);
      } catch (error) {
        message.error(error?.response?.data?.message || error.message);
      }
    };

    deleteChapter();
  };

  return (
    <StyledChapterBody>
      <StyledTable>
        <thead>
          <tr>
            <th>项目</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {chapters[currentIndex]?.map((chapter) => (
            <StyledRow key={chapter._id}>
              <td>{chapter.title}</td>
              <td>
                <Button onClick={() => deleteItem(chapter._id)} state="dange">
                  删除
                </Button>
                <Button>修改</Button>
              </td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      <AddButton currentOption={noteOptions[currentIndex]} />
    </StyledChapterBody>
  );
}

export default ChapterBody;
