import styled from 'styled-components';
import React, { useCallback, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export interface Result {
  title: string;
  tag: string;
  _id: string;
}

export interface SearchResultProps {
  isVisible?: boolean;
  results?: Result[];
  selectedIndex?: number;
}

const StyledOption = styled.button`
  width: 100%;
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 0;
  border: none;
  background-color: ${(props) => props.theme.foregroundColor};

  &:hover {
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.surfaceColor};
  }
`;

const StyledSearchResult = styled.div<SearchResultProps>`
  width: 100%;
  position: absolute;
  z-index: 3;
  background-color: ${(props) => props.theme.foregroundColor};
  padding: 0.5em 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 3px ${(props) => props.theme.shadowColor};

  & > ${StyledOption}:nth-of-type(${(props) => props.selectedIndex}) {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const SearchResult = (props: SearchResultProps) => {
  const { isVisible, results, selectedIndex = 0 } = props;

  const navigate = useNavigate();

  const handleMouseDown = useCallback(
    (result: Result) => navigate(`/reading/${result.tag ? 'articles' : 'chapters'}/${result._id}`),
    [navigate],
  );

  if (!isVisible || results?.length === 0) return null;

  return (
    <StyledSearchResult selectedIndex={selectedIndex}>
      {results?.map((result) => (
        <StyledOption key={result._id} type="button" onMouseDown={() => handleMouseDown(result)}>
          {result.title}
        </StyledOption>
      ))}
    </StyledSearchResult>
  );
};

export default React.memo(SearchResult);
