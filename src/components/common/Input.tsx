import styled from 'styled-components';
import { Size } from '../../config/config';

interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  maxLength: number;
  inputSize?: Size;
}

const StyledInput = styled.input<InputProps>`
  font-size: ${(props) => (props.inputSize ? props.inputSize : '1em')};
  caret-color: ${(props) => props.theme.warnColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: transparent;
  border-radius: 17px;
  padding: 4px 11px;
  color: ${(props) => props.theme.textColor};
  transition: all 0.3s;
  touch-action: manipulation;

  &:focus {
    border: 1px solid ${(props) => props.theme.primaryColor};
  }

  &:hover {
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
  }

  &:active {
    box-shadow: 0px 0px 6px ${(props) => props.theme.shadowColor};
  }
`;

const StyledFileInput = styled.label`
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
  const { type, inputSize, maxLength, placeholder, onChange, value } = props;

  return (
    <StyledInput
      inputSize={inputSize}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      value={value}
    />
  );
};

function FileInput(props) {
  const { title, accept, file, onChange } = props;

  return (
    <StyledFileInput>
      {file ? file.name : title}
      <input type="file" accept={accept} onChange={onChange} />
    </StyledFileInput>
  );
}

export { Input, FileInput };
