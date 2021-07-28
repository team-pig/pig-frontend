import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Template from "../components/Template";
import AddRoomModal from "../components/AddRoomModal";
import RoomCard from "../components/RoomCard";

//elements
import Button from "../elem/Button";

//redux
import {__getRoomList} from "../redux/modules/room";

const RoomList = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.roomList) || [];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(__getRoomList());
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Template>
      <div>roomlist</div>
      <Button _onClick={openModal}>방 생성하기</Button>
      <AddRoomModal showModal={showModal} closeModal={closeModal} />
      <div>
        {roomList.map((l, idx) => {
          return(
            <RoomCard key={idx} {...l} />
          )
        })}
      </div>
    </Template>
  );
};

export default RoomList;
