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

  const closeModal = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <ModalContainer>
          <ModalOverlay
            onClick={() => {
              setShowModal(false);
            }}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              closeModal={closeModal}
            >
              {children}
            </ModalContent>
          </ModalOverlay>
        </ModalContainer>
      )}
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
  z-index: var(--indexModal);
  overflow-y: auto;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100%;
  padding: 40px 0;
  background-color: rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
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
  min-height: 770px;
  height: auto;
  margin: auto auto;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    min-height: 100vh;
  }
padding: 12px 16px 0 16px;

`;

export default CardModal;
