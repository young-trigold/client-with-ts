import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import CancelIcon from '../../static/icon/cancel.png';
import MenuIcon from '../../static/icon/menu.png';
import IconPressSound from '../../static/audio/icon-press.mp3';
import addMediaEffect from '../../utils/addMediaEffect';
import LinkContainer from './LinkContainer';

const MenuButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.foregroundColor};
  position: relative;
`;

export interface MenuProps {
  isMenuVisible: boolean;
}

const Menu = styled.nav<MenuProps>`
  display: flex;
  flex-flow: column;
  border-radius: 6px;
  left: 0;
  top: 40px;
  min-width: 120px;
  position: absolute;
  z-index: 3;
  background-color: ${(props) => props.theme.foregroundColor};
  box-shadow: 0 0 6px ${(props) => props.theme.shadowColor};
  overflow: hidden;
  transition: all 0.3s;
  opacity: ${(props) => (props.isMenuVisible ? 1 : 0)};
  height: ${(props) => (props.isMenuVisible ? '156px' : '0')};

  & > button {
    padding: 4px;
    margin: 5px 0;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  min-width: 250px;
  justify-content: space-between;
`;

const StyledNavigation = styled.div`
  position: relative;

  @media (max-width: 640.99px) {
    ${NavContainer} {
      display: none;
    }
  }

  @media (min-width: 641px) {
    ${MenuButton} {
      display: none;
    }
  }
`;

const Navigation = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClick = useCallback(
    addMediaEffect(
      () => {
        setIsMenuVisible(!isMenuVisible);
      },
      IconPressSound,
      20,
    ),

    [setIsMenuVisible, isMenuVisible, addMediaEffect],
  );

  return (
    <StyledNavigation>
      <MenuButton type="button" onClick={handleClick}>
        <img alt="菜单" src={isMenuVisible ? CancelIcon : MenuIcon} width="24" />
      </MenuButton>

      <Menu isMenuVisible={isMenuVisible}>
        <LinkContainer />
      </Menu>

      <NavContainer>
        <LinkContainer />
      </NavContainer>
    </StyledNavigation>
  );
};

export default React.memo(Navigation);
