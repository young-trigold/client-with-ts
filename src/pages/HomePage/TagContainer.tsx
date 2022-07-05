import React, { useCallback } from 'react';
import styled from 'styled-components';

export interface TagContainerProps {
  currentIndex: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  tags?: string[];
}

const StyledTagContainer = styled.nav<TagContainerProps>`
  position: sticky;
  top: 45.99px;
  z-index: 2;
  background-color: transparent;
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.foregroundColor};
  justify-content: center;

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

const TagContainer = (props: TagContainerProps) => {
  const { currentIndex, setCurrentIndex, tags } = props;

  return (
    <StyledTagContainer currentIndex={currentIndex}>
      {tags?.map((tag, i) => (
        <StyledTag key={tag} onClick={useCallback(() => setCurrentIndex?.(i), [setCurrentIndex])}>
          {tag}
        </StyledTag>
      ))}
    </StyledTagContainer>
  );
};

export default TagContainer;
