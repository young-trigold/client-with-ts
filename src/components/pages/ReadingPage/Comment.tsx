import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

import { TextButton } from '../../common/Button';
import { message } from '../../Message/Message';
import px from '../../../utils/realPixel';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1em;
  margin: 1em 0;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.foregroundColor};
  background-image: linear-gradient(
      to right,
      ${(props) => props.theme.lineColor} ${px()},
      transparent 0
    ),
    linear-gradient(to bottom, ${(props) => props.theme.lineColor} ${px()}, transparent 0);
  background-size: 1.2em 1.2em;
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};

  & > button {
    margin-top: 1em;
    font-size: 1.2em;
  }

  @media (max-width: 400px) {
    & {
      border-radius: 0;
    }

    & > button {
      margin-right: auto;
    }
  }

  @media (min-width: 400.01px) {
    & > button {
      margin-left: auto;
    }
  }
`;

const StyledTitle = styled.h2`
  text-align: 'start';
  margin-top: 0;
`;

const StyledTextArea = styled.textarea`
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  word-break: break-word;
  flex: 1;
  padding: 8px 12px;
  min-width: 300px;
  min-height: 7em;
  line-height: 1.5em;
  height: fit-content;
  background-color: ${(props) => props.theme.backgroundColor};
  border: 2px solid ${(props) => props.theme.surfaceColor};
  border-radius: 0.5em;
  caret-color: ${(props) => props.theme.warnColor};
  color: ${(props) => props.theme.secondColor};
  transition: all 0.3s;

  &:focus {
    border: 2px solid ${(props) => props.theme.primaryColor};
  }

  &:hover {
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
  }

  &:active {
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
  }
`;

function Comment(props) {
  const { isChapter, itemId } = props;
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // eslint-disable-next-line consistent-return
  const postComment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return message.warn('您还没有登录!');

    try {
      await axios.put(
        `/api/${isChapter ? 'notes' : 'articles'}/${itemId}`,
        {
          comment,
        },
        {
          headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      message.success('发表成功!');
    } catch (error) {
      message.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <CommentContainer id="comment">
      <StyledTitle>评论</StyledTitle>
      <StyledTextArea onChange={handleCommentChange} />
      <TextButton title="发表评论" handler={postComment} />
    </CommentContainer>
  );
}

export default Comment;
