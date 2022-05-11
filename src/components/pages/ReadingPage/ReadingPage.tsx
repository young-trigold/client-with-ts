import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useLoadResource from '../../../hooks/useLoadResource';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import Aside from './Aside';
import Article from './Article';
import Catalog from './Catalog';
import CatalogButton from './CatalogButton';
import Comment from './Comment';
import CommentList from './CommentList';

const StyledReadingPage = styled.div`
  @media (max-width: 530px) {
    & > footer {
      padding-bottom: 64px;
    }
  }
`;

const MainContainer = styled.main`
  padding: 0 2em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;

  & > button {
    display: none;
  }

  @media (max-width: 899px) {
    padding: 0;

    & > button {
      display: flex;
      position: fixed;
      right: 2em;
      bottom: 110px;
    }
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  position: relative;
  flex: 7;
  min-width: 350px;
  display: flex;
  flex-direction: column;

  @media (min-width: 899px) {
    position: sticky;
    top: 0;
    margin-right: 1em;
  }
`;

function ReadingPage(props) {
  const { isChapter } = props;
  const { itemId } = useParams();
  useDocumentTitle('认真阅读ing...');

  const [headings, setHeadings] = useState([]);
  const [currentHeading, setCurrentHeading] = useState(0);

  const { loading, resource: item } = isChapter
    ? useLoadResource(`/api/notes/${itemId}`)
    : useLoadResource(`/api/articles/${itemId}`);

  useEffect(() => {
    const rawHeadings = item?.content?.match(/^#{2,3}(?!#)(.)+$/gm);

    if (rawHeadings) {
      setHeadings(
        rawHeadings.map((rawHeading) => ({
          level: rawHeading.match(/#/g).length,
          content: rawHeading.replace(/#/g, '').trim(),
        })),
      );
    }
  }, [!item?.content]);

  return (
    <StyledReadingPage>
      <Header />
      <MainContainer>
        <Aside isChapter={isChapter} itemId={itemId} />
        <Container>
          <Article
            content={item?.content}
            loading={loading}
            setCurrentHeading={setCurrentHeading}
          />
          <Comment isChapter={isChapter} itemId={itemId} />
          <CommentList comments={item?.comments} />
        </Container>
        <Catalog headings={headings} currentHeading={currentHeading} />
        <CatalogButton />
      </MainContainer>
      <Footer />
    </StyledReadingPage>
  );
}

export default ReadingPage;
