import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledLoadingIndicator = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1em;

  & > span {
    transition: all 0.3s ease-out;
  }

  & > span:nth-of-type(${(props) => props.curI + 1}) {
    transform: translateY(-1em);
  }
`;

function LoadingIndicator(props) {
  const { text } = props;
  const [curI, setCurI] = useState(0);

  useEffect(() => {
    let timer;

    if (curI < (text ? text.length : 3)) {
      timer = setTimeout(() => setCurI(curI + 1), 300);
    } else {
      timer = setTimeout(() => setCurI(0), 300);
    }

    return () => clearTimeout(timer);
  }, [curI]);

  return (
    <StyledLoadingIndicator curI={curI}>
      {(text || '加载中').split('').map((char) => (
        <span key={char}>{char}</span>
      ))}
      ...
    </StyledLoadingIndicator>
  );
}

export default LoadingIndicator;
