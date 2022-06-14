import styled from 'styled-components';

import Article from './Article';

import { ArticlesByTag } from './HomePage';

const StyledArticleShow = styled.section`
  margin-left: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export interface ArticleShowProps {
  articlesByTag: ArticlesByTag[] | undefined;
  currentIndex: number;
}

const ArticleShow = (props: ArticleShowProps) => {
  const { articlesByTag, currentIndex } = props;

  return (
    <StyledArticleShow>
      {articlesByTag
        ? articlesByTag[currentIndex]?.articles?.map((article) => (
            <Article key={article._id} article={article} />
          ))
        : null}
    </StyledArticleShow>
  );
};

export default ArticleShow;
