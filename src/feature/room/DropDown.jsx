import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
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
  // const [isDisplayDrop, setIsDisplayDrop] = useState(false);
  const dropDownModal = useRef();

  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (dropDownModal.current && !dropDownModal.current.contains(e.target)) {
      setIsDisplayDrop(false);
    }
  };

  const handleClickInside = (e) => {
    e.stopPropagation();
    setIsDisplayDrop((pre) => !pre);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropDownModal]);

  const disabled = !(userId === master);

  return (
    <>
      <Wrapper>
        <div>
          <Icon onClick={handleClickInside} icon="more" size="24px" />
        </div>
        {isDisplayDrop && (
          <Container ref={dropDownModal}>
            <Btn onClick={openModModal}>수정</Btn>
            <Btn onClick={exitRoom}>나가기</Btn>
            <Btn disabled={disabled} onClick={deleteRoom}>
              삭제
            </Btn>
          </Container>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  z-index: 29;
  cursor: pointer;
`;

const Container = styled.div`
  position: absolute;
  z-index: 29;
  left: 15px;
  top: 21px;

  display: flex;
  flex-direction: column;
  width: 84px;
  height: 126px;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: -0.01px -0.01px 2px rgb(0 0 0 / 10%),
    6px 6px 15px rgba(0 0 0 / 0.1);
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
