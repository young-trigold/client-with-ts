import styled from 'styled-components';
import { Size } from '../../config/config';

export type InputShape = 'rect' | 'rounded';

interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
  shape?: InputShape;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  maxLength?: number;
  inputSize?: Size;
  size?: number;
  [key: string]: any;
}

const StyledInput = styled.input<InputProps>`
  font-size: ${(props) =>
    (() => {
      switch (props.inputSize) {
        case 'large':
          return '18px';
        case 'small':
          return '14px';
        default:
          return '16px';
      }
    })()};
  caret-color: ${(props) => props.theme.warnColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: transparent;
  border-radius: ${(props) =>
    (() => {
      switch (props.shape) {
        case 'rounded':
          return '1em';
        default:
          return '4px';
      }
    })()};
  padding: ${(props) =>
    (() => {
      switch (props.inputSize) {
        case 'large':
          return '6.4px 15px';
        case 'small':
          return '0 7px';
        default:
          return '4px 15px';
      }
    })()};
  color: ${(props) => props.theme.textColor};
  transition: all 0.3s;
  touch-action: manipulation;

  &:hover {
    border-color: ${(props) => props.theme.hoverColor};
  }

  &:focus,
  &:active {
    border-color: ${(props) => props.theme.activeColor};
  }
`;

const StyledUpload = styled.label`
  background: ${(props) => props.theme.foregroundColor};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-block;
  font-weight: 500;
  margin-bottom: 1rem;
  outline: none;
  padding: 1em 2em;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;
  box-shadow: 0px 0px 3px ${(props) => props.theme.shadowColor};
  transition: all 0.3s ease;
  user-select: none;

  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }

  &:active {
    transform: scale(0.9);
  }

  & input {
    height: 0;
    width: 0;
    visibility: hidden;
  }
`;

const Input = (props: InputProps) => {
  const {
    type = 'text',
    shape = 'rounded',
    inputSize = 'middle',
    size,
    maxLength = 2,
    placeholder,
    onChange,
    onFocus,
    value,
  } = props;

  return (
    <StyledInput
      shape={shape}
      inputSize={inputSize}
      size={size}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      type={type}
      value={value}
    />
  );
};

export interface UploadProps {
  title?: string;
  accept?: string;
  file?: File;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Upload = (props: UploadProps) => {
  const { title, accept, file, onChange } = props;

  return (
    <StyledUpload>
      {file ? file.name : title}
      <input type="file" accept={accept} onChange={onChange} />
    </StyledUpload>
  );
};

export { Input, Upload };
