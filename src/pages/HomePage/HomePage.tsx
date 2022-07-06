import styled from 'styled-components';
import { useState } from 'react';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLoadResource from '../../hooks/useLoadResource';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import LoadingIndicator from '../../components/LoadingIndicator';
import ArticleShow from './ArticleShow';
import TagContainer from './TagContainer';

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.3s;
  font-size: 1em;
  min-height: 100vh;
  position: relative;
`;

export interface ArticleInfo {
  _id: string;
  title: string;
  likes: number;
  views: number;
  createdAt: string;
}

export interface ArticlesByTag {
  _id: string;
  articles: ArticleInfo[];
}

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, resource: articlesByTag } = useLoadResource<ArticlesByTag[]>('/api/articles');

  useDocumentTitle('欢迎回来');

  return (
    <StyledHomePage>
      <Header />
      <TagContainer
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        tags={articlesByTag?.map((articleTag) => articleTag._id)}
      />
      <main style={{ padding: '1em' }}>
        {loading ? (
          <LoadingIndicator text="文章马上就好" />
        ) : (
          <ArticleShow articlesByTag={articlesByTag} currentIndex={currentIndex} />
        )}
      </main>
      <Footer />
    </StyledHomePage>
  );
};

export default HomePage;
