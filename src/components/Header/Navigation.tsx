import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LoginButton from './LoginButton';
import CancelIcon from '../../static/icon/cancel.png';
import MenuIcon from '../../static/icon/menu.png';
import IconPressSound from '../../static/audio/icon-press.mp3';
import { Button } from '../common/Button';
import addMediaEffect from '../../utils/addMediaEffect';

const MenuButton = styled.button`
  border: none;
  background-color: transparent;
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
  height: ${(props) => (props.isMenuVisible ? '116px' : '0')};

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

function LinkContainer() {
  const navigate = useNavigate();

  const handleNoteClick = () => {
    navigate('/notes');
  };

  const handleArticleClick = () => {
    navigate('/');
  };

  return (
    <>
      <LoginButton />
      <Button buttonType="link" onClick={handleArticleClick}>
        我的文章
      </Button>
      <Button buttonType="link" onClick={handleNoteClick}>
        我的笔记
      </Button>
    </>
  );
}

function Navigation() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <StyledNavigation>
      <MenuButton type="button" onClick={addMediaEffect(handleClick, IconPressSound, 20)}>
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
}

export default Navigation;
