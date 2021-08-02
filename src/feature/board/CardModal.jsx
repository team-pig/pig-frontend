import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "../../elem";
import { useDispatch, useSelector } from "react-redux";

const CardModal = ({ showModal, children, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay
            onClick={() => {
              setShowModal((pre) => !pre);
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
  z-index: 99;
`;

const ModalOverlay = styled.div`
  position: absolute;
  /* display: initial; */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  width: 750px;
  height: 80%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default CardModal;
