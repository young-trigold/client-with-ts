import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeMode } from '../../theme/themeModeSlice';
import addMediaEffect from '../../utils/addMediaEffect';

import SunIconSrc from '../../static/icon/sun.png';
import MoonIconSrc from '../../static/icon/moon.png';
import ToggleSoundSrc from '../../static/audio/toggle.mp3';
import { RootState } from '../../app/store';

const StyledToggleThemeButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  position: relative;
  display: flex;
  padding: 3px 6px;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.primaryColor};
  border: none;
  box-shadow: 1px 1px 3px ${(props) => props.theme.shadowColor};
`;

interface MakerProps {
  themeMode: string;
  children?: React.ReactNode;
}

const Marker = styled.div<MakerProps>`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.surfaceColor};
  position: absolute;
  left: ${(props) => (props.themeMode === 'dark' ? '4px' : '40px')};
  transition: all 0.3s;
`;

const ToggleThemeButton = () => {
  const themeMode = useSelector((state: RootState) => state.themeMode.value);
  const dispath = useDispatch();

  const handleCilick = () => {
    dispath(toggleThemeMode());
  };

  return (
    <StyledToggleThemeButton
      type="button"
      onClick={addMediaEffect(handleCilick, ToggleSoundSrc, 20)}
    >
      <img src={SunIconSrc} width="24" alt="太阳" />
      <img src={MoonIconSrc} width="24" alt="月亮" />
      <Marker themeMode={themeMode} />
    </StyledToggleThemeButton>
  );
};

export default ToggleThemeButton;
