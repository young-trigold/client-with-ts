import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { message } from '../../components/Message/Message';
import getUserToken from '../../utils/getUserToken';

const CommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 1em;
  margin: 1em;
  border-radius: 10px;
  background-color: ${(props) => props.theme.foregroundColor};
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};

  @media (max-width: 530px) {
    border-radius: 0;
    margin: 0;
  }

  & > button {
    margin-top: 1em;
  }
`;

const StyledTitle = styled.h2`
  text-align: 'start';
  margin-top: 0;
`;

const StyledTextArea = styled.textarea`
  display: block;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif,
    BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  word-break: break-word;
  width: 100%;
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
    if (!userToken) return message.warn('????????????!');

    if (!comment) return message.warn('??????????????????!');

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

      message.success('????????????!');
    } catch (error) {
      if (axios.isAxiosError(error))
        return message.error((error.response?.data as { message: string })?.message);
      if (error instanceof Error) return message.error(error.message);
      return message.error(JSON.stringify(error));
    }
  }, [comment]);

  return (
    <CommentContainer id="comment">
      <StyledTitle>??????</StyledTitle>
      <StyledTextArea onChange={handleCommentChange} />
      <Button onClick={postComment}>????????????</Button>
    </CommentContainer>
  );
}

export default React.memo(Comment);
