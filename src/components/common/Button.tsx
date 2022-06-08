import styled from 'styled-components';

import debounce from '../../utils/debounce';
import addMediaEffect from '../../utils/addMediaEffect';
import IconPressSound from '../../static/audio/icon-press.mp3';

import { State, Size } from '../../config/config';

export type ButtonType = 'elevated' | 'outlined' | 'text' | 'link';
export type ButtonShape = 'rect' | 'rounded' | 'circular';

export interface ButtonProps {
  buttonType?: ButtonType;
  state?: State;
  shape?: ButtonShape;
  size?: Size;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    (() => {
      if (props.buttonType === 'elevated') return props.theme.primaryColor;
      return 'unset';
    })()};
  border: ${(props) =>
    (() => {
      if (props.buttonType === 'outlined') return `1px solid ${props.theme.borderColor}`;
      return 'none';
    })()};
  font-size: ${(props) =>
    (() => {
      switch (props.size) {
        case 'large':
          return '18px';
        case 'small':
          return '14px';
        default:
          return '16px';
      }
    })()};
  color: ${(props) =>
    (() => {
      if (props.buttonType === 'elevated') return props.theme.backgroundColor;
      if (props.buttonType === 'link') return props.theme.primaryColor;

      switch (props.state) {
        case 'dange':
          return props.theme.dangeColor;
        case 'success':
          return props.theme.successColor;
        case 'warn':
          return props.theme.warnColor;
        default:
          return props.theme.textColor;
      }
    })()};
  padding: ${(props) =>
    (() => {
      switch (props.size) {
        case 'large':
          return '6.4px 15px';
        case 'small':
          return '0 7px';
        default:
          return '4px 15px';
      }
    })()};
  border-radius: ${(props) =>
    (() => {
      switch (props.shape) {
        case 'rounded':
          return '1em';
        case 'circular':
          return '50%';
        default:
          return '4px';
      }
    })()};
  transition: ${(props) =>
    `all ${props.theme.transitionDuration} cubic-bezier(0.645, 0.045, 0.355, 1)`};
  user-select: none;
  touch-action: manipulation;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover,
  &:focus {
    color: ${(props) =>
      (() => {
        switch (props.buttonType) {
          case 'elevated':
            return props.theme.backgroundColor;
          case 'outlined':
            return props.theme.hoverColor;
          case 'link':
            return props.theme.hoverColor;
          default:
            return props.theme.textColor;
        }
      })()};
    border-color: ${(props) =>
      props.buttonType === 'outlined' ? props.theme.hoverColor : props.theme.textColor};
    background-color: ${(props) =>
      props.buttonType !== 'outlined' && props.buttonType !== 'link'
        ? props.theme.hoverColor
        : 'unset'};
  }

  &:active {
    color: ${(props) =>
      (() => {
        switch (props.buttonType) {
          case 'elevated':
            return props.theme.backgroundColor;
          case 'outlined':
            return props.theme.activeColor;
          case 'link':
            return props.theme.activeColor;
          default:
            return props.theme.textColor;
        }
      })()};
    border-color: ${(props) =>
      props.buttonType === 'outlined' ? props.theme.activeColor : props.theme.textColor};
    background-color: ${(props) =>
      props.buttonType === 'elevated' ? props.theme.activeColor : 'unset'};
  }
`;

const Button = (props: ButtonProps) => {
  const {
    onClick,
    buttonType = 'outlined',
    state,
    size = 'middle',
    shape = 'rect',
    children = '按钮',
    disabled = false,
  } = props;

  const handleClick = debounce((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onClick) addMediaEffect(onClick)(event);
  }, 600);

  return (
    <StyledButton
      onClick={handleClick}
      buttonType={buttonType}
      state={state}
      shape={shape}
      size={size}
      disabled={disabled}
      type="button"
    >
      {children}
    </StyledButton>
  );
};

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

const IconButton = (props: IconButtonProps) => {
  const { icon, width, description, handler } = props;

  return (
    <StyledIconButton type="button" onClick={addMediaEffect(handler, IconPressSound, 20)}>
      <img alt={description} src={icon} width={width} />
    </StyledIconButton>
  );
};

const StyledButtonBar = styled.div`
  & > * {
    margin: 0 0.5em;
  }
`;

export { Button, IconButton, StyledButtonBar };
