import React from "react";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  onConfirm,
  hasCloseButton,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHead>
          {title && <ModalTitle>{title}</ModalTitle>}

          {hasCloseButton && (
            <CloseButton onClick={onClose}>
              <BiX />
            </CloseButton>
          )}
        </ModalHead>

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button type="button" size="large" onClick={onConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
`;

const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const ModalTitle = styled.p`
  font-size: 18px;
`;

const ModalBody = styled.div`
  padding: 20px;
  max-height: 50vh;
  min-height: 20vh;
  overflow: hidden;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;

  button {
    flex: 1;
    border-radius: 0;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default Modal;
