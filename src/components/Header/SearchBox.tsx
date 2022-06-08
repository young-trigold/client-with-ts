import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import SearchImage from '../../static/icon/search.png';
import { Input } from '../common/Input';
import { message } from '../Message/Message';
import debounce from '../../utils/debounce';

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

  const handleMouseDown = (result: Result) => {
    window.location.href = `/reading/${result.tag ? 'articles' : 'chapters'}/${result._id}`;
  };

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

const SearchBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (searchValue.replace(/\s+/g, '')) {
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
    <div style={{ position: 'relative' }} onBlur={() => setIsVisible(false)}>
      <StyledSearchBox autoComplete="on">
        <Input
          placeholder="搜索文章"
          maxLength={8}
          size={12}
          onChange={debounce(onChange, 200)}
          onFocus={() => setIsVisible(true)}
        />
        <SearchImg src={SearchImage} width="24" alt="搜索" />
      </StyledSearchBox>
      <SearchResult isVisible={isVisible} results={results} />
    </div>
  );
};

export default SearchBox;
