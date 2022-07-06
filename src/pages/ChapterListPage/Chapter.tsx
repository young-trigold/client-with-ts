import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';
import LikeIcon from '../../static/icon/like.png';
import EyeOpen from '../../static/icon/eye-open.png';
import { ChapterInfo } from './ChapterListPage';
import debounce from '../../utils/debounce';

const StyledChapter = styled.article`
  position: relative;
  margin: 1em;
  padding: 1em;
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.foregroundColor};
  box-shadow: 5px 0px 15px ${(props) => props.theme.shadowColor};
  transition: all 0.3s;
  user-select: none;
  transition: all 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.hoverColor};
    background-color: ${(props) => props.theme.surfaceColor};
  }

  &:active {
    box-shadow: 3px 0px 5px ${(props) => props.theme.shadowColor};
    transform: scale(0.8);
  }
`;

const StyledInfoBar = styled.div`
  position: absolute;
  bottom: 1em;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

function Chapter(props: { chapter: ChapterInfo }) {
  const { chapter } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(
    debounce(() => {
      navigate(`/reading/chapters/${chapter._id}`);
    }, 200),
    [navigate, chapter],
  );

  return (
    <StyledChapter onClick={handleClick}>
      <div>{chapter.title}</div>
      <StyledInfoBar>
        <div>
          <img src={LikeIcon} alt="点赞" width="14" style={{ marginRight: '4px' }} />
          <span>{chapter.likes}</span>
        </div>
        <div>
          <img src={EyeOpen} alt="浏览" width="14" style={{ marginRight: '4px' }} />
          <span>{chapter.views}</span>
        </div>
      </StyledInfoBar>
    </StyledChapter>
  );
}

export default Chapter;
