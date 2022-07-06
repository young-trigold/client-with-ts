import styled from 'styled-components';

import useLoadResource from '../../hooks/useLoadResource';

import LoadingIndicator from '../../components/LoadingIndicator';
import Note from './Note';

import { ChapterInfo } from '../ChapterListPage/ChapterListPage';

const StyledNoteShow = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

export interface NoteInfo {
  _id: string;
  title: string;
  chapters: ChapterInfo[];
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
