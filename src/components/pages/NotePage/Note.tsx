import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledNote = styled.article`
  width: 220px;
  height: 300px;
  margin: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: larger;
  font-weight: bolder;
  user-select: none;
  background: linear-gradient(
    -90deg,
    ${(props) => props.theme.surfaceColor},
    ${(props) => props.theme.foregroundColor}
  );
  border-radius: 4px;
  border-left: 10px ${(props) => props.theme.primaryColor} solid;
  box-shadow: 5px 0px 5px ${(props) => props.theme.shadowColor};
  transform: perspective(600px) rotateY(-20deg);
  transition: all 0.3s ease;
  padding: 1em;
  cursor: pointer;

  &:hover {
    box-shadow: 5px 0px 15px ${(props) => props.theme.shadowColor};
    transform: rotateY(20deg);
  }

  &:active {
    color: ${(props) => props.theme.secondColor};
  }
`;

function Note(props) {
  const { note } = props;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/notes/${note.title}`, { state: { noteId: note._id } });
  };

  return (
    <StyledNote onClick={handleNavigate}>
      <h3>{note.title}</h3>
    </StyledNote>
  );
}

export default Note;
