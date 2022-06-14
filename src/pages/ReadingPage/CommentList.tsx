import styled from 'styled-components';

import { CommentInfo } from './ReadingPage';

const CommentListConstiner = styled.div`
  padding: 1em;
  margin: 1em 0;
  margin-top: 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.foregroundColor};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledComment = styled.div`
  margin: 1em;
`;

const StyledUserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export interface CommentListProps {
  comments?: CommentInfo[];
}

function CommentList(props: CommentListProps) {
  const { comments } = props;

  return comments?.length ? (
    <CommentListConstiner>
      {comments.map((comment) => (
        <Container key={comment._id}>
          <StyledUserInfo>
            <div>{comment?.user?.name}</div>
            <time dateTime={new Date(comment.updatedAt).toLocaleDateString()}>
              {new Date(comment.updatedAt).toLocaleDateString()}
            </time>
          </StyledUserInfo>
          <StyledComment>{comment?.content}</StyledComment>
        </Container>
      ))}
    </CommentListConstiner>
  ) : null;
}

export default CommentList;
