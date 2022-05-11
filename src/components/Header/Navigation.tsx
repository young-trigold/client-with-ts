import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LoginButton from './LoginButton';
import CancelIcon from '../../static/icon/cancel.png';
import MenuIcon from '../../static/icon/menu.png';
import IconPressSound from '../../static/audio/icon-press.mp3';
import { TextButton } from '../common/Button';
import addMediaEffect from '../../utils/addMediaEffect';

const MenuButton = styled.button`
  border: none;
  background-color: transparent;
  position: relative;
`;

const Menu = styled.nav`
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
  opacity: ${(props) => (props.isMeunVisible ? 1 : 0)};
  height: ${(props) => (props.isMeunVisible ? '116px' : '0')};

  & > button {
    padding: 4px;
    margin: 5px 0;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.3em;
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
      <TextButton title="我的文章" handler={handleArticleClick} />
      <TextButton title="我的笔记" handler={handleNoteClick} />
    </>
  );
}

function Navigation() {
  const [isMeunVisible, setIsMeunVisible] = useState(false);

  const handleClick = () => {
    setIsMeunVisible(!isMeunVisible);
  };

  return (
    <StyledNavigation>
      <MenuButton type="button" onClick={addMediaEffect(handleClick, IconPressSound, 20)}>
        <img alt="菜单" src={isMeunVisible ? CancelIcon : MenuIcon} width="24" />
      </MenuButton>

      <Menu isMeunVisible={isMeunVisible}>
        <LinkContainer />
      </Menu>

      <NavContainer>
        <LinkContainer />
      </NavContainer>
    </StyledNavigation>
  );
}

export default Navigation;
