import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import SearchImage from '../../static/icon/search.png';
import { Input } from '../Input';
import { message } from '../Message/Message';
import debounce from '../../utils/debounce';
import SearchResult from './SearchResult';

const StyledSearchBox = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchImg = styled.img`
  position: absolute;
  right: 1em;
`;

const SearchBox = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState([]);

  const onChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
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
    }, 200),
    [setResults],
  );

  return (
    <div
      style={{ position: 'relative' }}
      onBlur={useCallback(() => setIsVisible(false), [setIsVisible])}
    >
      <StyledSearchBox autoComplete="on">
        <Input
          placeholder="搜索文章"
          maxLength={8}
          size={12}
          onChange={onChange}
          onFocus={useCallback(() => setIsVisible(true), [setIsVisible])}
        />
        <SearchImg src={SearchImage} width="24" alt="搜索" />
      </StyledSearchBox>
      <SearchResult isVisible={isVisible} results={results} />
    </div>
  );
};

export default React.memo(SearchBox);
