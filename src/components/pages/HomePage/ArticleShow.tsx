import styled from 'styled-components';
import Article from './Article';

const StyledArticleShow = styled.section`
  margin-left: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function ArticleShow(props) {
  const { articleTags, currentIndex } = props;

  return (
    <StyledArticleShow>
      {articleTags
        ? articleTags[currentIndex]?.articles?.map((article) => (
            <Article key={article._id} article={article} />
          ))
        : null}
    </StyledArticleShow>
  );
}

export default ArticleShow;
