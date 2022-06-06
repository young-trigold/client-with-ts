import styled from 'styled-components';

const StyledTextInput = styled.input`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1em')};
  caret-color: ${(props) => props.theme.warnColor};
  border: 1px solid ${(props) => props.theme.foregroundColor};
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 17px;
  padding: 4px 8px;
  margin: 3px;
  color: ${(props) => props.theme.secondColor};
  transition: all 0.3s;

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
    color: ${(props) => props.theme.secondColor};
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

const TextInput = (props) => {
  const {
    type, size, maxLength, fontSize, placeholder, onChange, onFocus, onInput, value,
  } = props;

  return (
    <StyledTextInput
      fontSize={fontSize}
      size={size}
      maxLength={maxLength}
      placeholder={placeholder || ''}
      onChange={onChange}
      onFocus={onFocus}
      onInput={onInput}
      type={type || 'text'}
      value={value}
    />
  );
}

function FileInput(props) {
  const {
    title, accept, file, onChange,
  } = props;

  return (
    <StyledFileInput>
      {file ? file.name : title}
      <input type="file" accept={accept} onChange={onChange} />
    </StyledFileInput>
  );
}

export { TextInput, FileInput };
