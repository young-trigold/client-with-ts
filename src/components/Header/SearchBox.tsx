import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import debounce from '../../utils/debounce';
import SearchImage from '../../static/icon/search.png';
import { TextInput } from '../common/Input';
import { message } from '../Message/Message';

const StyledSearchContainer = styled.div`
  position: relative;
  justify-self: center;
`;

const StyledSearchBox = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchImg = styled.img`
  position: absolute;
  right: 1em;
`;

const StyledOption = styled.button`
  width: 100%;
  color: unset;
  font-size: 1em;
  text-align: left;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 0;
  border: none;
  background-color: ${(props) => props.theme.foregroundColor};

  &:hover {
    color: ${(props) => props.theme.secondColor};
    background-color: ${(props) => props.theme.surfaceColor};
  }
`;

const StyledSearchResult = styled.div`
  width: 100%;
  position: absolute;
  z-index: 3;
  background-color: ${(props) => props.theme.foregroundColor};
  padding: 0.5em 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 3px ${(props) => props.theme.shadowColor};

  & > ${StyledOption}:nth-of-type(${(props) => props.selectedIndex}) {
    color: ${(props) => props.theme.secondColor};
  }
`;

function SearchResult(props) {
  const { isVisible, results, selectedIndex } = props;

  const handleMouseDown = (result) => {
    window.location.href = `/reading/${result.tag ? 'articles' : 'chapters'}/${result._id}`;
  };

  if (!isVisible || results.length === 0) return null;

  return (
    <StyledSearchResult selectedIndex={selectedIndex}>
      {results.map((result, i) => (
        <StyledOption key={result[i]} type="button" onMouseDown={() => handleMouseDown(result)}>
          {result.title}
        </StyledOption>
      ))}
    </StyledSearchResult>
  );
}

function SearchBox() {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState([]);

  const handleInput = (event) => {
    const searchValue = event.target.value;

    if (searchValue) {
      Promise.all([
        axios.get(`/api/articles?keyword=${searchValue}`),
        axios.get(`/api/chapters?keyword=${searchValue}`),
      ])
        .then((responses) => {
          setResults(responses[0]?.data.concat(responses[1]?.data).slice(0, 10));
        })
        .catch((error) => {
          message.error(error?.response?.data?.message || error.message);
        });
    }
  };

  return (
    <StyledSearchContainer onBlur={() => setIsVisible(false)}>
      <StyledSearchBox autoComplete="off">
        <TextInput
          onFocus={() => setIsVisible(true)}
          fontSize="1.2em"
          placeholder="搜索文章"
          maxLength="10"
          size="10"
          onInput={debounce(handleInput, 200)}
        />
        <SearchImg src={SearchImage} width="24" alt="搜索" />
      </StyledSearchBox>
      <SearchResult isVisible={isVisible} results={results} />
    </StyledSearchContainer>
  );
}

export default SearchBox;
