import styled from 'styled-components';
import React from 'react';

export interface ModalProps {
  isModalVisible: boolean;
  children: React.ReactNode;
}

const StyledModal = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  min-width: 300px;
  background-color: ${(props) => props.theme.foregroundColor};
  border-radius: 8px;
  box-shadow: 1px 1px 4px ${(props) => props.theme.shadowColor};
  z-index: 5;
  transition: all 0.3s ease;
  position: relative;
  transform: ${(props) => (props.isModalVisible ? 'unset' : 'translateY(-200px)')};
`;

export interface MaskProps {
  isModalVisible: boolean;
}

const Mask = styled.div<MaskProps>`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: ${(props) => (props.isModalVisible ? '100vh' : '0')};
  opacity: ${(props) => (props.isModalVisible ? 1 : 0)};
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
`;

const Modal = (props: ModalProps) => {
  const { isModalVisible, children } = props;

  return (
    <Mask isModalVisible={isModalVisible}>
      <StyledModal isModalVisible={isModalVisible}>{children}</StyledModal>
    </Mask>
  );
};

export default Modal;
