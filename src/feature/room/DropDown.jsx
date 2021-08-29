import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Confirm from "../../components/Confirm";
import ConfirmModal from "../../components/ConfirmModal"; 
import { button } from "../../themes/textStyle";

import {__deleteRoom} from "../../redux/modules/room";

const DropDown = ({
  roomId,
  userId,
  master,
  openModModal,
  exitRoom,
  isDisplayDrop,
  setIsDisplayDrop,
}) => {
  const dispatch = useDispatch();
  const dropDownModal = useRef();
  // show로 confirmModal 보이고 안보이고 결정
  const show = useSelector((state)=>state.confirm.show)
  // Confirm 컴포넌트에서 confirm 가져오기
  // confirm(모달 열고, true, false 값 받기, promise사용해서 true, false 값 받은 뒤에 행동하도록 하는 역할)
  const {confirm} = Confirm();
  const showConfirm = async () => {
    const isConfirmed = await confirm();
    
    if(isConfirmed) {
      dispatch(__deleteRoom(roomId));
      console.log("삭제완료");
    }else{
      console.log("삭제취소");
    }
  }

  // openConfirm은 조건을 걸어서 showConfirm 실행하도록 하는 역할
  const openConfirm = (e) => {
    e.stopPropagation();
    setIsDisplayDrop(false);
    if(userId === master){
      showConfirm();
    }

  }


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
    {show && <ConfirmModal msg="🗑 정말 이 방을 삭제할까요?" />}
      {isDisplayDrop && (
        <Container ref={dropDownModal}>
          <Btn disabled={disabled} onClick={openModModal}>
            수정
          </Btn>
          <Btn disabled={!disabled} onClick={exitRoom}>
            나가기
          </Btn>
          <Btn disabled={disabled} onClick={openConfirm}>
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
