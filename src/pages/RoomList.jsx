import React, { useState } from "react";

//components
import Template from "../components/Template";
import AddRoomModal from "../components/AddRoomModal";
import RoomCard from "../components/RoomCard";

//elements
import Button from "../elem/Button";

const RoomList = () => {
  const [showModal, setShowModal] = useState(false);

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
        <RoomCard />
      </div>
    </Template>
  );
};

export default RoomList;
