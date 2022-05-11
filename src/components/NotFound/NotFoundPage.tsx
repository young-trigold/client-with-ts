import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

import { TextButton } from '../common/Button';

const StyledNotFoundPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function NotFoundPage() {
  const navigate = useNavigate();

  useDocumentTitle('该页面不存在');

  return (
    <StyledNotFoundPage>
      <h1>找不到该页面</h1>
      <TextButton handler={() => navigate('/', { replace: true })} title="回到主页" />
    </StyledNotFoundPage>
  );
}

export default NotFoundPage;
