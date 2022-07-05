import styled from 'styled-components';

import { useParams, useLocation } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLoadResource from '../../hooks/useLoadResource';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoadingIndicator from '../../components/LoadingIndicator';
import Chapter from './Chapter';

const ChaptersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const StyledChapterTitle = styled.h2`
  text-align: center;
`;

export interface ChapterInfo {
  _id: string;
  likes: number;
  views: number;
  title: string;
}

function ChapterListPage() {
  const { noteTitle } = useParams();
  const { noteId } = useLocation().state as { [key: string]: string };

  const { loading, resource: chapters } = useLoadResource<ChapterInfo[]>(
    `/api/chapters/${noteId}`,
    [noteId],
  );

  useDocumentTitle(noteTitle);

  return (
    <div>
      <Header />
      <main>
        <StyledChapterTitle>{noteTitle}</StyledChapterTitle>
        {loading ? (
          <LoadingIndicator text="目录马上就好" />
        ) : (
          <ChaptersContainer>
            {chapters?.map((chapter) => (
              <Chapter key={chapter._id} chapter={chapter as ChapterInfo} />
            ))}
          </ChaptersContainer>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ChapterListPage;
