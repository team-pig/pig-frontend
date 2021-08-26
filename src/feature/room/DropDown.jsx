import React, { useEffect, useRef } from "react";

import styled from "styled-components";

import { button } from "../../themes/textStyle";

const DropDown = ({
  userId,
  master,
  openModModal,
  deleteRoom,
  exitRoom,
  isDisplayDrop,
  setIsDisplayDrop,
}) => {
  const dropDownModal = useRef();

  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (dropDownModal.current && !dropDownModal.current.contains(e.target)) {
      setIsDisplayDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropDownModal]);

  const disabled = !(userId === master);

  return (
    <>
      {isDisplayDrop && (
        <Container ref={dropDownModal}>
          <Btn disabled={disabled} onClick={openModModal}>
            수정
          </Btn>
          <Btn disabled={!disabled} onClick={exitRoom}>
            나가기
          </Btn>
          <Btn disabled={disabled} onClick={deleteRoom}>
            삭제
          </Btn>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 29;
  right: -52px;
  bottom: -100px;

  display: flex;
  flex-direction: column;
  width: 84px;
  height: 126px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: -0.01px -0.01px 2px rgb(0 0 0 / 10%),
    6px 6px 15px rgba(0 0 0 / 0.1);
  ${({ theme }) => theme.device.mobile} {
    right: -20px;
    bottom: -10px;
  }
`;

const Btn = styled.div`
  ${button}
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  width: 84px;
  height: 42px;
  padding-left: 20px;
  ${(props) =>
    props.disabled
      ? `background-color: var(--line); color: var(--grey);`
      : `color: var(--darkgrey);`}
  &:hover {
    ${(props) =>
      props.disabled ? `color: var(--grey);` : `color: var(--main);`}
  }
`;

export default DropDown;
