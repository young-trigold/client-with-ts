import styled from 'styled-components';

import useLoadResource from '../../../hooks/useLoadResource';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import Note from './Note';

const StyledNoteShow = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export interface NoteInfo {
  _id: string;
  title: string;
}

const NoteShow = () => {
  const { resource: notes, loading } = useLoadResource<NoteInfo[]>('/api/notes');

  return loading ? (
    <LoadingIndicator text="笔记马上就好" />
  ) : (
    <StyledNoteShow>
      {notes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </StyledNoteShow>
  );
};

export default NoteShow;
