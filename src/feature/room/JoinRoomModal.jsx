import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

//components
import Icon from "../../components/Icon";

// elements
import { Button, Text } from "../../elem/index";
import RoomTags from "./RoomTags";
import RoomInput from "./RoomInput";

//redux
import { __getInviteCodeRoom, __joinRoom } from "../../redux/modules/room";

// 방 입장하기 모달(다른 사람이 만든 방에 초대코드로 입장)
const JoinRoomModal = ({ showModal, joinModal }) => {
  const dispatch = useDispatch();
  const [inviteCode, setInviteCode] = useState("");
  const [isInfo, setIsInfo] = useState(false);

  const _room = useSelector((state) => state.room.inviteCodeRoom);
  const isInviteRoom =
    _room.inviteCode === inviteCode.inviteCode ? true : false;

  // 초대코드 입력 시 방 정보를 미리 띄우기 위해 리덕스에서 방 정보 받아옴 
  const { roomImage, roomName, tag } = useSelector(
    (state) => state.room.inviteCodeRoom
  );

  // inviteCode(36자) 입력, 방 정보 서버에 요청
  const changeHandler = async (keyword) => {
    setInviteCode(keyword);
    if (keyword.length === 36) {
      dispatch(__getInviteCodeRoom(keyword));
      setIsInfo(true);
    }
  };

  // inviteCode 요청 수 줄이기 위해 debounce 사용
  const debounceFunc = debounce(changeHandler, 200);

  // inviteCode===""이라면 disabled 처리
  const disabled = inviteCode === "";
  // disabled 아닐 때 방 입장하기
  const join = () => {
    if (!disabled) {
      dispatch(__joinRoom({ inviteCode }));
    }
    setInviteCode("");
    setIsInfo(false);
    joinModal();
  };

  const cancel = () => {
    setIsInfo(false);
    setInviteCode("");
    joinModal();
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

              <RoomInput
                name="inviteCode"
                placeholder="초대코드 입력해주세요!"
                _onChange={(e) => {
                  debounceFunc(e.target.value);
                }}
                type="text"
                maxLength="36"
              />
            </InputBox>
            <BtnBox>
              <LeftBtn>
                <Button shape="green-outline" _onClick={cancel}>
                  취소
                </Button>
              </LeftBtn>
              <RightBtn>
                <Button disabled={disabled} _onClick={join}>
                  입장하기
                </Button>
              </RightBtn>
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
  justify-content: space-between;
  width: 400px;
  height: 500px;
  padding-top: 5px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  text-align: center;
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: 100%;
    padding: 70px 0 70px 0;
    border-radius: 0px;
  }
`;

const DefaultImage = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--line);
  color: var(--grey);
`;

const ImageBox = styled.div`
  margin: 0 auto;
  padding-top: 46px;
  ${({ theme }) => theme.device.mobile} {
    padding-top: 0;
    padding-bottom: 30px;
  }
`;

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${(props) => props.url}");
  background-size: cover;
  background-position: center center;
`;

const IconBox = styled.div`
  margin: 0 auto;
`;

const InputBox = styled.div`
  margin: 0 auto;
  width: 324px;
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 340px;
    min-width: 270px;
    padding: 0 10px 0 10px;
  }
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
  border: 1px solid var(--line);
  color: var(--darkgrey);

  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: normal;
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: 0 auto;
  padding-bottom: 46px;
  ${({ theme }) => theme.device.mobile} {
    max-width: 280px;
    min-width: 240px;
    padding: 30px 10px 46px 10px;
  }
`;

const LeftBtn = styled.div`
  width: 100%;
`;

const RightBtn = styled.div`
  width: 100%;
  margin-left: -1px;
`;

export default JoinRoomModal;
