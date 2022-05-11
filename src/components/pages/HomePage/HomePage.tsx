import styled from 'styled-components';
import { useState } from 'react';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useLoadResource from '../../../hooks/useLoadResource';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import ArticleShow from './ArticleShow';
import TagContainer from './TagContainer';

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.3s;
  font-size: 1em;
  min-height: 100vh;
`;

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, resource: articleTags } = useLoadResource('/api/articles');
  useDocumentTitle('欢迎回来');

  return (
    <StyledHomePage>
      <Header atHomePage />
      <TagContainer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        tags={articleTags?.map((articleTag) => articleTag._id.title)}
      />
      <main style={{ padding: '1em' }}>
        {loading ? (
          <LoadingIndicator text="文章马上就好" />
        ) : (
          <ArticleShow articleTags={articleTags} currentIndex={currentIndex} />
        )}
      </main>
      <Footer />
    </StyledHomePage>
  );
}

export default HomePage;
