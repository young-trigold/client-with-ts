import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import LikeIcon from '../../static/icon/like.png';
import EyeOpen from '../../static/icon/eye-open.png';
import { ArticleInfo } from './HomePage';

const StyledArticle = styled.article`
  margin: 1.5em 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 230px;
  width: 160px;
  background: ${(props) => props.theme.foregroundColor};
  border-radius: 10px;
  transition: all 0.3s;
  position: relative;
  margin-left: -1.5em;
  user-select: none;
  touch-action: manipulation;
  box-shadow: 0 0 4px ${(props) => props.theme.shadowColor};
  border: 1px solid ${(props) => props.theme.borderColor};

  &:hover {
    z-index: 1;
    box-shadow: 0 0 15px ${(props) => props.theme.shadowColor};
    transform: translateY(-1.5em);
    margin-left: 0.5em;
  }

  @media (max-width: 400px) {
    margin-left: unset;

    &:hover {
      margin-left: unset;
      transform: translateY(-1em);
    }
  }
`;

const StyledArticleTitle = styled.h3`
  font-size: 1em;
  text-align: center;
  margin: 0;
`;

const StyledArticleBar = styled.div`
  min-height: 3px;
  width: 0;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.hoverColor},
    ${(props) => props.theme.primaryColor}
  );
  transition: all 0.3s ease;

  ${StyledArticle}:hover & {
    width: 100%;
  }
`;

const StyledInfoBar = styled.div`
  position: absolute;
  top: 30%;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledTime = styled.time`
  position: absolute;
  right: 1em;
  bottom: 3em;
`;

export interface ArticleProps {
  article: ArticleInfo;
}

const Article = (props: ArticleProps) => {
  const { article } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/reading/articles/${article._id}`);
  };

  return (
    <StyledArticle onClick={handleClick}>
      <StyledArticleTitle>
        {article.title}
        <StyledArticleBar />
      </StyledArticleTitle>

      <StyledInfoBar>
        <div>
          <img src={LikeIcon} alt="??????" width="14" style={{ marginRight: '4px' }} />
          <span>{article.likes}</span>
        </div>
        <div>
          <img src={EyeOpen} alt="??????" width="14" style={{ marginRight: '4px' }} />
          <span>{article.views}</span>
        </div>
      </StyledInfoBar>
      <StyledTime dateTime={new Date(article.createdAt).toLocaleDateString()}>
        {new Date(article.createdAt).toLocaleDateString()}
      </StyledTime>
    </StyledArticle>
  );
};

export default Article;
