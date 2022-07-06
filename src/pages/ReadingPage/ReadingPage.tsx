import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLoadResource from '../../hooks/useLoadResource';

import Header from '../../components/Header/Header';
import Aside from './Aside';
import Article from './Article';
import CatalogButton from './CatalogButton';

import { HeadingInfo } from './Heading';

const Catalog = React.lazy(() => import('./Catalog'));
const Comment = React.lazy(() => import('./Comment'));
const CommentList = React.lazy(() => import('./CommentList'));
const Footer = React.lazy(() => import('../../components/Footer/Footer'));

const StyledReadingPage = styled.div`
  @media (max-width: 530px) {
    & > footer {
      padding-bottom: 64px;
    }
  }
`;

const MainContainer = styled.main`
  margin: 0 2em;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  transition: all 0.3s;

  & > button {
    display: flex;
    position: fixed;
    right: 2em;
    bottom: 110px;
    z-index: -1;
    opacity: 0;
  }

  @media (max-width: 899px) {
    margin: 0;

    & > button {
      z-index: 1;
      opacity: 1;
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

export interface ReadingPageProps {
  isChapter: boolean;
}

export interface User {
  _id: string;
  role: string;
  name: string;
  pwd: string;
}

export interface CommentInfo {
  _id: string;
  user: User;
  updatedAt: string;
  content: string;
}

export interface Item {
  comments: CommentInfo[];
  content: string;
}

const ReadingPage = (props: ReadingPageProps) => {
  const { isChapter } = props;

  useDocumentTitle('认真阅读中...');

  const { itemId } = useParams();

  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [currentHeading, setCurrentHeading] = useState<string>('');

  const { loading, resource: item } = isChapter
    ? useLoadResource<Item>(`/api/notes/${itemId}`, [itemId])
    : useLoadResource<Item>(`/api/articles/${itemId}`, [itemId]);

  useEffect(() => {
    const rawHeadings = item?.content?.match(/^#{2,3}(?!#)(.)+$/gm);

    if (rawHeadings) {
      setHeadings(
        rawHeadings.map((rawHeading) => ({
          level: rawHeading.match(/#/g)?.length ?? 0,
          content: rawHeading.replace(/#/g, '').trim(),
        })),
      );
    }
  }, [item]);

  return (
    <StyledReadingPage>
      <Header />
      <MainContainer>
        <Aside isChapter={isChapter} itemId={itemId ?? ''} />
        <Container>
          <Article
            content={item?.content ?? ''}
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
};

export default ReadingPage;
