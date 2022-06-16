import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { NoteInfo } from './NoteShow';

const StyledNote = styled.ol`
  list-style: none;
  width: 220px;
  height: 300px;
  margin: 1.5em;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: larger;
  font-weight: bolder;
  user-select: none;
  background-color: ${(props) => props.theme.foregroundColor};
  border-radius: 2px 16px 16px 2px;
  box-shadow: 5px 0px 15px ${(props) => props.theme.shadowColor};
  transform: perspective(600px) rotateY(-20deg);
  transition: all 0.3s ease;
  padding: 1em;
  cursor: pointer;
  z-index: 2;

  &:hover {
    box-shadow: 5px 0px 5px ${(props) => props.theme.shadowColor};
    transform: rotateY(20deg);
    & > li {
      width: 220px !important;
    }
  }

  &:active {
    color: ${(props) => props.theme.activeColor};
  }

  &:before {
    display: block;
    position: absolute;
    content: '';
    z-index: 11;
    left: 0;
    width: 10px;
    height: 100%;
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

const StyledPage = styled.li`
  width: 220px;
  height: 300px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 2px 16px 16px 2px;
  position: absolute;
`;

export interface NoteProps {
  note: NoteInfo;
}

const Note = (props: NoteProps) => {
  const { note } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/notes/${note.title}`, { state: { noteId: note._id } });
  };

  return (
    <StyledNote onClick={handleNavigate}>
      <h3>{note.title}</h3>
      <StyledPage style={{ zIndex: 1, width: '224px' }} />
      <StyledPage style={{ zIndex: 0, width: '228px' }} />
      <StyledPage style={{ zIndex: -1, width: '232px' }} />
      <StyledPage style={{ zIndex: -2, width: '236px' }} />
    </StyledNote>
  );
};

export default Note;
