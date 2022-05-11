import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useLoadResource from '../../../hooks/useLoadResource';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Chapter from './Chapter';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';

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

function ChapterListPage() {
  const { noteTitle } = useParams();
  const { noteId } = useLocation().state;

  const { loading, resource: chapters } = useLoadResource(`/api/chapters/${noteId}`);
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
              <Chapter key={chapter._id} chapter={chapter} />
            ))}
          </ChaptersContainer>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ChapterListPage;
