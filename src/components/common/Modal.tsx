import styled from 'styled-components';
import React from 'react';

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  min-width: 300px;
  background-color: ${(props) => props.theme.foregroundColor};
  border-radius: 16px;
  box-shadow: 5px 0px 15px ${(props) => props.theme.shadowColor};
  z-index: 5;
  transition: all 0.3s ease;
  position: relative;
  transform: ${(props) => (props.isVisible ? 'unset' : 'translateY(-200px)')};
`;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: ${(props) => (props.isVisible ? '100vh' : '0')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
`;

export interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
}

function Modal(props: ModalProps) {
  const { isVisible, children } = props;

  return (
    <ModalContainer isVisible={isVisible}>
      <StyledModal isVisible={isVisible}>{children}</StyledModal>
    </ModalContainer>
  );
}

export default Modal;
