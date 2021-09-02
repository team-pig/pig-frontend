import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";

//components

// elements
import { Button, Input } from "../../elem/index";
import RoomInput from "./RoomInput";

//redux
import { __editRoom } from "../../redux/modules/room";
import ImageModule from "../../components/ImageModule";

// 방 수정하기 모달
const ModifyRoomModal = ({ roomId, showModModal, closeModModal }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room);
  const isEdit = roomId ? true : false;
  // 방 정보를 받아온다
  const _room = isEdit
    ? roomList && roomList.find((r) => r.roomId === roomId)
    : null;
  const [imgUrl, setImgUrl] = useState("");
  // 받아온 방의 정보를 띄운다
  const [roomImg, setRoomImg] = useState(_room.roomImage);
  const [contents, setContents] = useState(
    _room
      ? {
          roomName: _room.roomName,
          subtitle: _room.subtitle,
        }
      : ""
  );

  const [tagText, setTagText] = useState(
    _room
      ? {
          tag: _room.tag,
        }
      : ""
  );

  // ImageModule의 함수, s3 이용해 url 형태로 파일 저장
  const getImgUrlFromS3 = async (callback, file) => {
    const result = await callback(file);
    setImgUrl("");
    setRoomImg(result);
  };

  // 방 정보 바뀔 때마다 실행, 방 정보를 저장한다
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setContents({ ...contents, [name]: value });
    setTagText({ ...tagText, [name]: value });
  };

  const changeImgUrl = (e) => {
    setImgUrl(e.target.value);
    setRoomImg(e.target.value);
  };

  // tag를 , 기준으로 나누어 list
  const tagList =
    typeof tagText.tag === "string" ? tagText.tag.split(",") : tagText.tag;

  // 방 이름이 "" 라면 disabled
  const disabled = contents.roomName === "";

  // 방 수정하기
  const modifyFile = () => {
    if (!disabled) {
      dispatch(__editRoom(roomId, contents, roomImg, tagList));
    }
    setImgUrl("");
    closeModModal();
  };

  const cancelFile = () => {
    setRoomImg(_room.roomImage);
    setImgUrl("");
    setContents({ roomName: _room.roomName, subtitle: _room.subtitle });
    setTagText({ tag: _room.tag });
    closeModModal();
  };

  return (
    <>
      {showModModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancelFile}></ModalOverlay>
          <ModalContent>
            <InputBox>
              <ImageBox>
                <ImageModule
                  setRoomImg={setRoomImg}
                  roomPreview={roomImg}
                  getImgUrlFromS3={getImgUrlFromS3}
                  option="true"
                />
              </ImageBox>
              <RoomInput
                name="roomName"
                type="text"
                placeholder="방 이름"
                _onChange={changeHandler}
                value={contents.roomName}
              />
              <RoomInput
                name="subtitle"
                type="text"
                placeholder="부제목"
                _onChange={changeHandler}
                value={contents.subtitle}
              />
              <RoomInput
                name="tag"
                type="text"
                placeholder="태그"
                _onChange={changeHandler}
                value={tagText.tag}
              />
            </InputBox>
            <BtnBox>
              <LeftBtn>
                <Button shape="green-outline" _onClick={cancelFile}>
                  취소
                </Button>
              </LeftBtn>
              <RightBtn>
                <Button disabled={disabled} _onClick={modifyFile}>
                  수정
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
  height: 550px;
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

const ImageBox = styled.div`
  margin: 0 auto;
  padding-top: 46px;
  ${({ theme }) => theme.device.mobile} {
    padding-top: 0;
  }
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

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: 0 auto;
  padding-bottom: 46px;
  ${({ theme }) => theme.device.mobile} {
    max-width: 280px;
    min-width: 240px;
    padding: 30px 10px 40px 10px;
  }
`;

const LeftBtn = styled.div`
  width: 100%;
`;

const RightBtn = styled.div`
  width: 100%;
  margin-left: -1px;
`;

export default ModifyRoomModal;
