import styled from 'styled-components';
import { useEffect, useState } from 'react';

import px from '../../utils/realPixel';
import Navigation from './Navigation';
import SearchBox from './SearchBox';
import ToggleThemeButton from './ToggleThemeButton';

const StyledHeader = styled.header`
  min-width: 340px;
  overflow: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  height: ${(props) => (props.isVisible ? '50px' : '0')};
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

function Header(props) {
  const { atHomePage } = props;
  const [isVisible, setIsVisible] = useState(true);

  if (atHomePage) {
    const hideHeaderWhileScroll = () => window.requestAnimationFrame(
      () => {
        if (window.scrollY > 54) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      },
    );

    useEffect(() => {
      window.addEventListener('scroll', hideHeaderWhileScroll);

      return () => window.removeEventListener('scroll', hideHeaderWhileScroll);
    }, [window.scrollY]);
  }

  return (
    <StyledHeader isVisible={isVisible}>
      <Navigation />
      <SearchBox />
      <ToggleThemeButton />
    </StyledHeader>
  );
}

export default Header;