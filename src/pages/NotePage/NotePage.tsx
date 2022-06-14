import styled from 'styled-components';

import useDocumentTitle from '../../hooks/useDocumentTitle';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import NoteShow from './NoteShow';

const StyledNotePage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  transition: all 0.3s;
  font-size: 1em;
  min-height: 100vh;
`;

const MainContainer = styled.main`
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`;

const NotePage = () => {
  useDocumentTitle('我的笔记');

  return (
    <StyledNotePage>
      <Header />
      <MainContainer>
        <NoteShow />
      </MainContainer>
      <Footer />
    </StyledNotePage>
  );
};

export default NotePage;
