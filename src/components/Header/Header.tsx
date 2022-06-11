import styled from 'styled-components';

import px from '../../utils/realPixel';
import Navigation from './Navigation';
import SearchBox from './SearchBox';
import ToggleThemeButton from './ToggleThemeButton';

const StyledHeader = styled.header`
  min-width: 340px;
  height: 46px;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.foregroundColor};
  position: sticky;
  border-bottom: ${px()} solid ${(props) => props.theme.shadowColor};
  top: 0;
  z-index: 3;
  transition: all 0.3s ease-in-out;
`;

const Header = () => (
  <StyledHeader>
    <Navigation />
    <SearchBox />
    <ToggleThemeButton />
  </StyledHeader>
);

export default Header;
