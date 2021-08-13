import React, { useState, useRef } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import { useDispatch, useSelector } from "react-redux";

//components
import ImgUploader from "../../components/ImgUploader";
import Icon from "../../components/Icon";

// elements
import { Button, Input, Text } from "../../elem/index";
import RoomTags from "./RoomTags";

//redux
import {
  __getInviteCodeRoom,
  __getMarkedList,
  __joinRoom,
} from "../../redux/modules/room";

const JoinRoomModal = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState({
    roomImage: "",
    roomName: "",
    tag: "",
  });
  const [inviteCode, setInviteCode] = useState();
  const [isInfo, setIsInfo] = useState(false);
  const roomImage = useSelector((state) => state.room.inviteCodeRoom.roomImage);
  const roomName = useSelector((state) => state.room.inviteCodeRoom.roomName);
  const tag = useSelector((state) => state.room.inviteCodeRoom.tag);

  const changeHandler = async (e) => {
    const { value, name } = e.target;
    await setInviteCode({ ...inviteCode, [name]: value });
    console.log(value);
    setIsInfo(true);
    dispatch(__getInviteCodeRoom(value));
  };

  const join = () => {
    dispatch(__joinRoom(inviteCode));
    setIsInfo(false);
    closeModal();
  };

  const cancel = () => {
    setIsInfo(false);
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancel}></ModalOverlay>
          <ModalContent>
            <ImageBox>
              {isInfo && <Image url={roomImage} />}
              {!isInfo && (
                <DefaultImage>
                  <IconBox>
                    <Icon icon="image" size="28px" />
                  </IconBox>
                </DefaultImage>
              )}
            </ImageBox>
            <InputBox>
              {isInfo && (
                <Content>
                  <Text type="body_3" color="var(--darkgrey)">
                    {roomName}
                  </Text>
                </Content>
              )}
              {!isInfo && <Content></Content>}

              {isInfo && (
                <Content>
                  <Text type="body_3" color="var(--darkgrey)">
                    <RoomTags type="modal" tag={tag} />
                  </Text>
                </Content>
              )}
              {!isInfo && <Content></Content>}

              <InviteCodeInput
                name="inviteCode"
                placeholder="초대코드 입력해주세요!"
                onChange={changeHandler}
              />
            </InputBox>
            <BtnBox>
              <Button shape="green-outline" size="150" _onClick={cancel}>
                취소
              </Button>
              <Btn>
                <Button size="150" _onClick={join}>
                  입장하기
                </Button>
              </Btn>
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

const DefaultImage = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--line);
  color: var(--darkgrey);
`;

const ImageBox = styled.div`
  margin: 0 auto;
  padding: 46px 0 46px 0;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${(props) => props.url}");
  background-size: cover;
`;

const IconBox = styled.div`
  margin: 0 auto;
`;

const InputBox = styled.div`
  margin: 0 auto;
  width: 324px;
`;

const InviteCodeInput = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 10px 0 10px;
  border: 1px solid var(--darkgrey);
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  height: 46px;
  margin-bottom: 12px;
  padding: 0 10px 0 10px;
  background-color: var(--line);
  border: 1px solid var(--darkgrey);
  color: var(--darkgrey);

  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: normal;
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: auto auto 0 auto;
  padding-bottom: 46px;
`;

const Btn = styled.div`
  margin-left: -1px;
`;

export default JoinRoomModal;
