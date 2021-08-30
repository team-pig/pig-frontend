import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

//components

// elements
import { Button, Input } from "../../elem/index";
import RoomInput from "./RoomInput";

//redux
import { __addRoom } from "../../redux/modules/room";
import ImageModule from "../../components/ImageModule";

const AddRoomModal = ({ showModal, addModal }) => {
  const dispatch = useDispatch();
  const [roomImg, setRoomImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [contents, setContents] = useState({
    roomName: "",
    subtitle: "",
  });
  const [tagText, setTagText] = useState({
    tag: "",
  });

  const getImgUrlFromS3 = async (callback, file) => {
    const result = await callback(file);
    setRoomImg(result);
    setImgUrl("");
  };

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setContents({ ...contents, [name]: value });
    setTagText({ ...tagText, [name]: value });
    if (imgUrl !== "") {
      setRoomImg(imgUrl);
    }
  };

  const changeImgUrl = (e) => {
    setImgUrl(e.target.value);
  };

  const tagList = tagText.tag.split(",");

  const disabled = contents.roomName === "";
  const saveFile = () => {
    if (!disabled) {
      dispatch(__addRoom(contents, roomImg, tagList));
    }
    setContents({
      roomName: "",
      subtitle: "",
      tag: "",
    });
    addModal();
    setImgUrl("");
    setRoomImg("");
  };

  const cancelFile = () => {
    addModal();
    setImgUrl("");
    setRoomImg("");
  };

  const onReset = () => {
    setImgUrl("");
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancelFile}></ModalOverlay>
          <ModalContent>
          
            <InputBox>
            <ImageBox>
              <ImageModule
                setRoomImg={setRoomImg}
                roomPreview={imgUrl}
                getImgUrlFromS3={getImgUrlFromS3}
                option="true"
              />
            </ImageBox>
              <RoomInput
                name="roomName"
                type="text"
                placeholder="방 이름"
                _onChange={changeHandler}
              />
              <RoomInput
                name="subtitle"
                type="text"
                placeholder="부제목"
                _onChange={changeHandler}
              />
              <RoomInput
                name="tag"
                type="text"
                placeholder="태그,태그,태그..."
                _onChange={changeHandler}
              />
            </InputBox>
            <BtnBox>
              <LeftBtn>
              <Button shape="green-outline"  _onClick={cancelFile}>
                취소
              </Button>
              </LeftBtn>
              <RightBtn>
                <Button disabled={disabled}  _onClick={saveFile}>
                  만들기
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
    min-width: 250px;
    padding: 46px 10px 46px 10px;
  }
`;

const LeftBtn = styled.div`
  width: 100%;
`;

const RightBtn = styled.div`
  width: 100%;
  margin-left: -1px;
`;


export default AddRoomModal;
