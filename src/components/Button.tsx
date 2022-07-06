import styled from 'styled-components';

import React, { useCallback } from 'react';
import debounce from '../utils/debounce';
import addMediaEffect from '../utils/addMediaEffect';

import TextPressSoundSrc from '../static/audio/text-press.mp3';
import IconPressSoundSrc from '../static/audio/icon-press.mp3';
import { State, Size } from '../theme/styled';

export type ButtonType = 'elevated' | 'outlined' | 'text' | 'link';
export type ButtonShape = 'rect' | 'rounded' | 'circular';

export interface ButtonProps {
  type?: string;
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
  transition: all 0.3s;
  user-select: none;
  touch-action: manipulation;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  position: relative;

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

const Button = React.memo((props: ButtonProps) => {
  const {
    onClick,
    type = 'button',
    buttonType = 'outlined',
    state,
    size = 'middle',
    shape = 'rect',
    children = '按钮',
    disabled = false,
  } = props;

  const handleClick = useCallback(
    debounce((event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      if (onClick) addMediaEffect(onClick, TextPressSoundSrc)(event);
    }, 600),
    [onClick, debounce, addMediaEffect, TextPressSoundSrc],
  );

  return (
    <StyledButton
      onClick={handleClick}
      buttonType={buttonType}
      state={state}
      shape={shape}
      size={size}
      disabled={disabled}
      type={type}
    >
      {children}
    </StyledButton>
  );
});

const StyledIconButton = styled.button`
  position: relative;
  background-color: ${(props) => props.theme.foregroundColor};
  border: none;
  border-radius: 25px;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  user-select: none;

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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = React.memo((props: IconButtonProps) => {
  const { icon, width, description, onClick } = props;

  const handleClick = useCallback(
    debounce((event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) addMediaEffect(onClick, IconPressSoundSrc, 20)(event);
    }, 600),
    [onClick, IconPressSoundSrc, addMediaEffect, debounce],
  );

  return (
    <StyledIconButton type="button" onClick={handleClick}>
      <img alt={description} src={icon} width={width} />
    </StyledIconButton>
  );
});

const StyledButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export interface FloatingActionButtonProps {
  icon: string;
  width: number;
  description: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledFloatingActionButton = styled.button`
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.primaryColor};
  border: none;
  border-radius: 25px;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  user-select: none;
  box-shadow: 3px 3px 3px ${(props) => props.theme.shadowColor};

  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }

  &:active {
    transform: scale(0.9);
    background-color: ${(props) => props.theme.activeColor};
  }
`;

const FloatingActionButton = React.memo((props: FloatingActionButtonProps) => {
  const { icon, width, description, onClick } = props;

  const handleClick = useCallback(
    debounce((event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) addMediaEffect(onClick, IconPressSoundSrc, 20)(event);
    }, 600),
    [onClick, IconPressSoundSrc, addMediaEffect],
  );

  return (
    <StyledFloatingActionButton type="button" onClick={handleClick}>
      <img alt={description} src={icon} width={width} />
    </StyledFloatingActionButton>
  );
});

export { Button, IconButton, FloatingActionButton, StyledButtonBar };
