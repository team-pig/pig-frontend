import React, { useState, useRef } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import { useDispatch, useSelector } from "react-redux";

//components
import ImgUploader from "../../components/ImgUploader";

// elements
import { Button, Input } from "../../elem/index";

//redux
import { __joinRoom } from "../../redux/modules/room";

const JoinRoomModal = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState({
    roomImage: "",
    roomName: "",
    tag: "",
  });
  const [inviteCode, setInviteCode] = useState();

  const [isImage, setIsImage] = useState(false);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setInviteCode({ ...inviteCode, [name]: value });
  };

  const join = () => {
    dispatch(__joinRoom(inviteCode));
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={closeModal}></ModalOverlay>
          <ModalContent>
            <ImageBox>
              <ImgUploader
                setIsImage={setIsImage}
                isImage={isImage}
                name="roomImage"
              />
            </ImageBox>
            <InputBox>
              {/* <Input
                // name="roomName"
                type="text"
                placeholder="방 이름"
                _onChange={changeHandler}
              />

              <Input
                // name="tag"
                type="text"
                placeholder="태그"
                _onChange={changeHandler}
              /> */}
              <input
                // name="inviteCode"
                placeholder="초대코드 입력해주세요!"
                _onChange={changeHandler}
              />
            </InputBox>
            <BtnBox>
              <Button shape="green-outline" size="200" _onClick={closeModal}>
                취소
              </Button>
              <Button size="200" _onClick={join}>
                입장하기
              </Button>
            </BtnBox>
          </ModalContent>
        </ModalContainer>
      ) : null}
    </>
  );
};
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ModalOverlay = styled.div`
  position: absolute;

  display: initial;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  padding-top: 5px;

  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  text-align: center;
`;

const ImageBox = styled.div`
  margin: 0 auto;
  padding: 46px 0 46px 0;
`;

const InputBox = styled.div`
  margin: 0 auto;
  width: 324px;
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: auto auto 0 auto;
  padding-bottom: 46px;
`;

export default JoinRoomModal;
