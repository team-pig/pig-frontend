import React, { useState, useRef } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

import {useDispatch, useSelector} from "react-redux";

//components
import ImgUploader from "../components/ImgUploader";

// elements
import Input from "../elem/Input";
import Button from "../elem/Button";

//redux
import { __addRoom, __editRoom } from "../redux/modules/room";
import { setPreview, uploadImageToS3 } from "../redux/modules/image";

const AddRoomModal = ({ roomId, showModal, closeModal }) => {
  const dispatch = useDispatch();
  const [contents, setContents] = useState({
    roomImage:"",
    roomName:"",
    subtitle:"",
    tag:"",
  });
  const roomList = useSelector((state) => state.room.roomList);
  const preview = useSelector((state) => state.image.preview);

  const fileInput = useRef();

  const isEdit = roomId ? true : false;


  React.useEffect(() => {
    console.log(roomId);
  })

  const changeHandler = (e) => {
    const {value, name} = e.target;
    setContents({...contents, [name]: value});
  }

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

    const {Location} = await upload.promise();
    dispatch(uploadImageToS3(Location));
    dispatch(__addRoom(contents));
  };

  const editRoom = () => {
    console.log(roomId);
    dispatch(__editRoom(roomId, {contents: contents}))
  }

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={closeModal}></ModalOverlay>
          <ModalContent>
            <ImgUploader name="roomImage" fileInput={fileInput}/>
            
            <input name="roomName" placeholder="방 이름" onChange={changeHandler}/>
            <input name="subtitle" placeholder="부제목" onChange={changeHandler}/>
            <input name="tag" placeholder="태그" onChange={changeHandler}/>
            {/* {isEdit ? (
              <Button _onClick={editRoom}>수정</Button>
            ) : (
              <Button _onClick={handleFileInput}>저장</Button>
            )} */}
            <Button _onClick={handleFileInput}>저장</Button>
            {/* <Button _onClick={editRoom}>수정</Button> */}
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
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
  width: 400px;
  height: 400px;
  padding-top: 5px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

export default AddRoomModal;
