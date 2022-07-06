import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { StyledTable, StyledRow } from './StyledTable';
import { StyledButtonBar, Button, FloatingActionButton } from '../../components/Button';
import AddChapterModal from './AddChapterModal';
import { message } from '../../components/Message/Message';

import AddIcon from '../../static/icon/plus.png';
import CancelIcon from '../../static/icon/cancel.png';
import { ChapterInfo } from '../ChapterListPage/ChapterListPage';
import { NoteOption } from './AdminPage';

const StyledChapterBody = styled.main`
  flex: 8;
  overflow: auto;
  background-color: ${(props) => props.theme.backgroundColor};

  & > button {
    position: fixed;
    bottom: 4em;
    right: 4em;

    @media (max-width: 400px) {
      bottom: 4em;
      right: 2em;
    }
  }
`;

export interface OptionInfo {
  _id: string;
  title: string;
}

export interface AddButtonProps {
  currentOption: NoteOption;
}

const AddButton = React.memo((props: AddButtonProps) => {
  const { currentOption } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [setIsModalVisible, isModalVisible]);

  return (
    <>
      <FloatingActionButton
        icon={isModalVisible ? CancelIcon : AddIcon}
        width={24}
        description="添加"
        onClick={handleClick}
      />
      <AddChapterModal
        isModalVisible={isModalVisible}
        currentOption={currentOption}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

export interface ChapterBodyProps {
  currentIndex: number;
  chapters: ChapterInfo[][];
  noteOptions: NoteOption[];
}

function ChapterBody(props: ChapterBodyProps) {
  const { currentIndex, chapters, noteOptions } = props;

  const deleteItem = useCallback(
    (chapterId: string) => {
      const deleteChapter = async () => {
        try {
          await axios.delete(`/api/notes/${noteOptions[currentIndex]._id}/${chapterId}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') ?? '')?.token}`,
            },
          });

          message.success('删除成功!');
          window.location.reload();
        } catch (error) {
          if (axios.isAxiosError(error))
            return message.error((error.response?.data as { message: string })?.message);
          if (error instanceof Error) return message.error(error.message);
          return message.error(JSON.stringify(error));
        }
      };

      deleteChapter();
    },
    [noteOptions],
  );

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
                <StyledButtonBar>
                  <Button
                    onClick={() => deleteItem(chapter._id)}
                    state="dange"
                    size={window.matchMedia('(max-width: 400px)').matches ? 'small' : 'middle'}
                  >
                    删除
                  </Button>
                  <Button
                    size={window.matchMedia('(max-width: 400px)').matches ? 'small' : 'middle'}
                  >
                    修改
                  </Button>
                </StyledButtonBar>
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
