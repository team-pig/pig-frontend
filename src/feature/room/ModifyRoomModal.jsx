import React, { useState, useRef } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import { useDispatch, useSelector } from "react-redux";

//components
import ImgUploader from "../../components/ImgUploader";

// elements
import { Button, Input } from "../../elem/index";

//redux
import { __addRoom, __editRoom } from "../../redux/modules/room";
import { setPreview, uploadImageToS3 } from "../../redux/modules/image";

const ModifyRoomModal = ({ roomId, showModModal, closeModModal }) => {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState({
    roomImage: "",
    roomName: "",
    subtitle: "",
    tag: "",
  });
  const [isImage, setIsImage] = useState(false);
  const roomList = useSelector((state) => state.room.roomList);
  const preview = useSelector((state) => state.image.preview);

  const fileInput = useRef();

  const isEdit = roomId ? true : false;

  // let _room = isEdit ? roomList.find((r) => r.roomId === roomId) : null;

  // const [contents, setContents] = useState(_room ? _room.contents : "");

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setNewContent({ ...newContent, [name]: value });
  };

  // Upload to S3 image bucket!
  const handleFileInput = async (e) => {
    const file = fileInput.current.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "teampigbucket",
        Key: file.name,
        Body: file,
      },
    });

    const { Location } = await upload.promise();
    dispatch(uploadImageToS3(Location));
    dispatch(__editRoom(roomId, newContent));
  };

  const modifyFile = () => {
    // dispatch(__editRoom(roomId, newContent));
    handleFileInput();
    closeModModal();
    setIsImage(false);
    console.log(roomId);
  };

  const cancelFile = () => {
    closeModModal();
    setIsImage(false);
  }

  return (
    <>
      {showModModal ? (
        <ModalContainer>
          <ModalOverlay onClick={cancelFile}></ModalOverlay>
          <ModalContent>
          <ImageBox>
            <ImgUploader
              setIsImage={setIsImage}
              isImage={isImage}
              name="roomImage"
              fileInput={fileInput}
            />
         </ImageBox>
         <InputBox>
            <Input
              name="roomName"
              type="text"
              value=""
              placeholder="방 이름"
              onChange={changeHandler}
            />
            <Input
              name="subtitle"
              type="text"
              value=""
              placeholder="부제목"
              onChange={changeHandler}
            />
            <Input name="tag"  type="text"
              value="" placeholder="태그" onChange={changeHandler} />
            </InputBox>
            <BtnBox>
            <Button shape="green-outline" size="200" _onClick={cancelFile}>취소</Button>
            <Button size="200" _onClick={modifyFile}>수정</Button>
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

export default ModifyRoomModal;
