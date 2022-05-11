import styled from 'styled-components';

import addMediaEffect from '../../utils/addMediaEffect';
import TextPressSound from '../../static/audio/text-press.mp3';
import IconPressSound from '../../static/audio/icon-press.mp3';

const StyledTextButton = styled.button`
  background-color: ${(props) => props.theme.foregroundColor};
  border: none;
  font-size: 1em;
  color: ${(props) => props.theme.secondColor};
  margin-right: 0.5em;
  border-radius: 6px;
  transition: all 0.3s;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) => props.theme.surfaceColor};
    }
  }

  &:active {
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

function TextButton(props) {
  const { title, handler } = props;

  return (
    <StyledTextButton
      type="button"
      onClick={addMediaEffect(handler, TextPressSound, 20)}
    >
      {title}
    </StyledTextButton>
  );
}

const StyledWarnButton = styled(StyledTextButton)`
  @media (hover: hover) {
    &:hover {
      color: ${(props) => props.theme.warnColor};
    }
  }
`;

function WarnButton(props) {
  const { title, handler } = props;

  return (
    <StyledWarnButton
      type="button"
      onClick={addMediaEffect(handler, TextPressSound, 20)}
    >
      {title}
    </StyledWarnButton>
  );
}

const StyledDangeButton = styled(StyledTextButton)`
  @media (hover: hover) {
    &:hover {
      color: ${(props) => props.theme.dangeColor};
    }
  }
`;

function DangeButton(props) {
  const { title, handler } = props;

  return (
    <StyledDangeButton
      type="button"
      onClick={addMediaEffect(handler, TextPressSound, 20)}
    >
      {title}
    </StyledDangeButton>
  );
}

const StyledIconButton = styled.button`
  background-color: ${(props) => props.theme.foregroundColor};
  border: none;
  border-radius: 25px;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  user-select: none;
  box-shadow: 3px 3px 3px ${(props) => props.theme.shadowColor};

  &:hover {
    background-color: ${(props) => props.theme.surfaceColor};
  }

  &:active {
    transform: scale(0.9);
    background-color: ${(props) => props.theme.surfaceColor};
  }
`;

function IconButton(props) {
  const {
    icon, width, desription, handler,
  } = props;

  return (
    <StyledIconButton type="button" onClick={addMediaEffect(handler, IconPressSound, 20)}>
      <img alt={desription} src={icon} width={width} />
    </StyledIconButton>
  );
}

const StyledButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export {
  WarnButton, DangeButton, TextButton, IconButton, StyledButtonBar,
};
