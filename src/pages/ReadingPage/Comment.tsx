import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { message } from '../../components/Message/Message';
import getUserToken from '../../utils/getUserToken';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1em;
  margin: 1em 0;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.foregroundColor};
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};

  & > button {
    margin-top: 1em;
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
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5em;
  caret-color: ${(props) => props.theme.warnColor};
  color: ${(props) => props.theme.primaryColor};
  transition: all 0.3s;
  resize: none;

  &:active,
  &:focus {
    border: 1px solid ${(props) => props.theme.activeColor};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.hoverColor};
  }
`;

export interface CommmentProps {
  isChapter: boolean;
  itemId?: string;
}

function Comment(props: CommmentProps) {
  const { isChapter, itemId } = props;

  const [comment, setComment] = useState('');

  const handleCommentChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(event.target.value);
    },
    [setComment],
  );

  // eslint-disable-next-line consistent-return
  const postComment = useCallback(async () => {
    const userToken = getUserToken();
    if (!userToken) return message.warn('请先登录!');

    if (!comment) return message.warn('内容不可为空!');

    try {
      await axios.put(
        `/api/${isChapter ? 'notes' : 'articles'}/${itemId}`,
        {
          comment,
        },
        {
          headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      message.success('发表成功!');
    } catch (error) {
      if (axios.isAxiosError(error))
        return message.error((error.response?.data as { message: string })?.message);
      if (error instanceof Error) return message.error(error.message);
      return message.error(JSON.stringify(error));
    }
  }, [comment]);

  return (
    <CommentContainer id="comment">
      <StyledTitle>评论</StyledTitle>
      <StyledTextArea onChange={handleCommentChange} />
      <Button onClick={postComment}>发表评论</Button>
    </CommentContainer>
  );
}

export default React.memo(Comment);
