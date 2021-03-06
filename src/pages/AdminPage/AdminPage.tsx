import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import NewNoteOption from './NewNoteOption';
import NewTagOption from './NewTagOption';
import { message } from '../../components/Message/Message';
import LoadingIndicator from '../../components/LoadingIndicator';
import AdminBody from './AdminBody';

import { NoteInfo } from '../NotePage/NoteShow';
import { ArticleInfo, ArticlesByTag } from '../HomePage/HomePage';
import { ChapterInfo } from '../ChapterListPage/ChapterListPage';

const StyledAdminPage = styled.div`
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const NavigationBar = styled.nav`
  padding: 1em;
  min-width: 180px;
  flex: 2;
  border-right: 1px solid ${(props) => props.theme.borderColor};

  @media (max-width: 500px) {
    min-width: 120px;
  }
`;

const NavigationBarTitle = styled.h2`
  margin: 0.5em 0;
  display: flex;
  justify-content: space-between;
  padding: 6px;
  transition: all 0.3s ease;
  user-select: none;
  font-size: 18px;
`;

const OptionContainer = styled.ol<{ currentIndex: number }>`
  user-select: none;
  padding-left: 0;
  margin-left: 2em;
  list-style: none;
  overflow-y: hidden;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.foregroundColor};

  & > li:nth-of-type(${(props) => props.currentIndex + 1}) {
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.activeColor};
  }

  @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const Option = styled.li`
  margin-top: 0.5em;
  padding: 6px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:hover {
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.hoverColor};
  }

  &:active {
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.activeColor};
  }
`;

export interface NoteOption {
  _id: string;
  title: string;
}

const AdminPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [noteOptions, setNoteOptions] = useState<NoteOption[]>([]);
  const [chapters, setChapters] = useState<ChapterInfo[][]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [articles, setArticles] = useState<ArticleInfo[][]>([]);
  const [loading, setLoading] = useState(true);

  useDocumentTitle('????????????');

  useEffect(() => {
    Promise.all([axios.get('/api/notes'), axios.get('/api/articles')])
      .then((response) => {
        setNoteOptions(
          response[0].data?.map((note: NoteInfo) => ({ title: note.title, _id: note._id })),
        );
        setChapters(response[0].data?.map((note: NoteInfo) => note.chapters));
        setTagOptions(response[1].data?.map((tag: ArticlesByTag) => tag._id));
        setArticles(response[1].data?.map((tag: ArticlesByTag) => tag.articles));
      })
      .catch((error) => {
        message.error(error?.response?.data?.message || error.message);
      })
      .finally(() => setLoading(false));
  }, [setNoteOptions, setArticles, setTagOptions, setChapters]);

  if (loading) return <LoadingIndicator />;

  return (
    <StyledAdminPage>
      <NavigationBar>
        <div>
          <NavigationBarTitle>????????????</NavigationBarTitle>
          <OptionContainer currentIndex={currentIndex}>
            {noteOptions?.map((noteOption, i) => (
              <Option key={noteOption._id} onClick={() => setCurrentIndex(i)}>
                {noteOption.title}
              </Option>
            ))}
            <NewNoteOption />
          </OptionContainer>
        </div>
        <div>
          <NavigationBarTitle>????????????</NavigationBarTitle>
          <OptionContainer currentIndex={currentIndex - noteOptions.length}>
            {tagOptions.map((tagOption, i) => (
              <Option
                key={i.toString() + Math.random().toString()}
                onClick={() => setCurrentIndex(i + noteOptions.length)}
              >
                {tagOption}
              </Option>
            ))}
            <NewTagOption />
          </OptionContainer>
        </div>
      </NavigationBar>
      <AdminBody
        currentIndex={currentIndex}
        noteOptionsLength={noteOptions.length}
        tagOptions={tagOptions}
        articles={articles}
        noteOptions={noteOptions}
        chapters={chapters}
      />
    </StyledAdminPage>
  );
};

export default AdminPage;
