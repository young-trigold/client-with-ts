import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledTagContainer = styled.nav`
  position: sticky;
  top: ${(props) => `${props.curTop}px`};
  z-index: 2;
  box-shadow: inset 0 0 4px ${(props) => props.theme.shadowColor};
  background-color: transparent;
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.foregroundColor};
  justify-content: center;
  box-shadow: 0px 0px 2px rgb(0 0 0 / 0.5);

  & > button:nth-of-type(${(props) => props.currentIndex + 1}) {
    color: ${(props) => props.theme.backgroundColor};
    box-shadow: 1px 1px 3px ${(props) => props.theme.shadowColor};
    background: linear-gradient(
      180deg,
      ${(props) => props.theme.primaryColor},
      ${(props) => props.theme.hoverColor}
    );
  }
`;

const StyledTag = styled.button`
  user-select: none;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  border: none;
  border-radius: 1em;
  margin: 0.5em;
  cursor: pointer;
  background-color: ${(props) => props.theme.foregroundColor};

  &:hover,
  &:active {
    color: ${(props) => props.theme.backgroundColor};
    background: linear-gradient(
      180deg,
      ${(props) => props.theme.primaryColor},
      ${(props) => props.theme.hoverColor}
    );
  }
`;

function TagContainer(props) {
  const { currentIndex, setCurrentIndex, tags } = props;

  const [curTop, setcurTop] = useState(50);

  const setTopWhileScroll = () => {
    if (window.scrollY > 54) {
      setcurTop(0);
    } else {
      setcurTop(50);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setTopWhileScroll);

    return () => window.removeEventListener('scroll', setTopWhileScroll);
  }, [window.scrollY]);

  return (
    <StyledTagContainer currentIndex={currentIndex} curTop={curTop}>
      {tags?.map((tag, i) => (
        <StyledTag key={tag} onClick={() => setCurrentIndex(i)}>
          {tag}
        </StyledTag>
      ))}
    </StyledTagContainer>
  );
}

export default TagContainer;
