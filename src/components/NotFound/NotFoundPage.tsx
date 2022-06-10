import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { Button } from '../common/Button';

const StyledNotFoundPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  useDocumentTitle('该页面不存在');

  return (
    <StyledNotFoundPage>
      <h1>找不到该页面</h1>
      <Button onClick={() => navigate('/', { replace: true })}>回到主页</Button>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
