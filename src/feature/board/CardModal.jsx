import React, { useEffect } from "react";
import styled from "styled-components";
import { scrollbar } from "../../themes/scrollbar";
const CardModal = ({ showModal, children, setShowModal }) => {
  // 모달이 있는 경우 뒤 스크롤이 움직이지 않도록 고정
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay
            onClick={() => {
              setShowModal(false);
            }}
          />
          <ModalContent>{children}</ModalContent>
        </ModalContainer>
      ) : null}
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--indexModal);
`;

const ModalOverlay = styled.div`
  position: absolute;
  /* display: initial; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  ${scrollbar};

  --verticalMargin: 20px;
  --minusHeight: calc(var(---verticalMargin) *2)

  position: relative;
  top: 0;
  left: 0;
  z-index: var(--indexModal);
  width: 560px;
  height: calc(100vh - var(--minusHeight));
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default CardModal;
