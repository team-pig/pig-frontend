import React from "react";
import styled from "styled-components";
import Confirm from "./Confirm";

import { Button } from "../elem";

import flex from "../themes/flex";
import { body_3 } from "../themes/textStyle";

const ConfirmModal = ({ msg }) => {
  const { onConfirm, onCancel } = Confirm();

  return (
    <>
    
      <ModalContainer>
        <ModalOverlay onClick={onCancel}>
          <ModalContent>
            <Desc>{msg}</Desc>
            <BtnSet>
              <Button size="150" _onClick={onConfirm}>
                확인
              </Button>
              <Button size="150" _onClick={onCancel}>
                취소
              </Button>
            </BtnSet>
          </ModalContent>
        </ModalOverlay>
      </ModalContainer>
    
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.01);
`;

const Desc = styled.div`
  ${body_3}
`;

const ModalContent = styled.div`
  ${flex("end", "center", false)}
  position: absolute;
  padding: 14px;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  gap: 10px;
  z-index: var(--indexModal);
  width: 404px;
  height: 200px;
  background-color: var(--white);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const BtnSet = styled.div`
  ${flex()}
  margin: 24px 0 40px 0;
`;

export default ConfirmModal;
