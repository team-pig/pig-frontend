import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

//components

// elements
import { Button, Input } from "../../elem/index";

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
    if(imgUrl !== ""){
      setRoomImg(imgUrl);
    }

  };

  const changeImgUrl = (e) => {
    setImgUrl(e.target.value);
  }

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

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancelFile}></ModalOverlay>
          <ModalContent>
            <ImageBox>
              <ImageModule 
              roomPreview={imgUrl}
              getImgUrlFromS3={getImgUrlFromS3} />
            </ImageBox>
            <InputBox>
            <Input
                name="roomImage"
                type="text"
                placeholder="이미지 url"
                value={imgUrl}
                _onChange={changeImgUrl}
              />
              <Input
                name="roomName"
                type="text"
                placeholder="방 이름"
                _onChange={changeHandler}
              />
              <Input
                name="subtitle"
                type="text"
                placeholder="부제목"
                _onChange={changeHandler}
              />
              <Input
                name="tag"
                type="text"
                placeholder="태그"
                _onChange={changeHandler}
              />
            </InputBox>
            <BtnBox>
              <Button shape="green-outline" size="150" _onClick={cancelFile}>
                취소
              </Button>
              <Btn>
                <Button disabled={disabled} size="150" _onClick={saveFile}>
                  만들기
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
    width: 320px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: 0 auto;
  padding-bottom: 46px;
`;

const Btn = styled.div`
  margin-left: -1px;
`;

export default AddRoomModal;
