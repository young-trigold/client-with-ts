import styled from 'styled-components';

import addMediaEffect from '../../utils/addMediaEffect';
import IconPressSound from '../../static/audio/icon-press.mp3';

export type ButtonType = 'elevated' | 'outlined' | 'text' | 'link';
export type ButtonShape = 'rect' | 'rounded' | 'circular';
export type ButtonState = 'dange' | 'warn' | 'success';

export interface ButtonProps {
  buttonType?: ButtonType;
  state?: ButtonState;
  shape?: ButtonShape;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.theme.foregroundColor};
  border: none;
  font-size: 1rem;
  color: ${(props) => props.theme.secondColor};
  margin-right: 0.5em;
  border-radius: 6px;
  transition: 0.2s;
  user-select: none;
  touch-action: manipulation;

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) => props.theme.surfaceColor};
    }
  }

  &:active {
    background-color: ${(props) => props.theme.primaryColor};
  }
`;

function Button(props: ButtonProps) {
  const {
    onClick,
    buttonType = 'elevated',
    state,
    shape = 'rect',
    children = '按钮',
    disabled = false,
  } = props;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) addMediaEffect(onClick)(event);
  };

  return (
    <StyledButton onClick={handleClick} buttonType={buttonType} state={state} shape={shape} type="button">
      {children}
    </StyledButton>
  );
}

const getHoverStateColor = (state:ButtonState) => {};

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
  transition: 0.2s;
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

export interface IconButtonProps {
  icon: string;
  width: number;
  description: string;
  handler: React.MouseEventHandler<HTMLElement>;
}

function IconButton(props: IconButtonProps) {
  const { icon, width, description, handler } = props;

  return (
    <StyledIconButton type="button" onClick={addMediaEffect(handler, IconPressSound, 20)}>
      <img alt={description} src={icon} width={width} />
    </StyledIconButton>
  );
}

const StyledButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export { Button, IconButton, StyledButtonBar };
