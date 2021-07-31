import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Template from "../components/Template";
import AddRoomModal from "../components/AddRoomModal";
import JoinRoomModal from "../components/JoinRoomModal";
import RoomCard from "../components/RoomCard";

//elements
import Button from "../elem/Button";

//redux
import { __getRoomList } from "../redux/modules/room";

const RoomList = ({history}) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    dispatch(__getRoomList());
  }, []);


  const openJoinModal = () => {
    setShowModal(true);
    setIsJoin(true);
  };

  const openModal = () => {
    setShowModal(true);
    setIsJoin(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Template>
      <div>roomlist</div>
      <Button _onClick={openJoinModal}>코드로 방 참여</Button>
      <Button _onClick={openModal}>방 생성하기</Button>
      {!isJoin && (
        <AddRoomModal showModal={showModal} closeModal={closeModal} />
      )}
      {isJoin && (
        <JoinRoomModal showModal={showModal} closeModal={closeModal} />
      )}
      <div>
        {roomList.map((room, idx) => {
          return (
            <RoomCard
              key={idx}
              {...room}
              history={history}
            />
          );
        })}
      </div>
    </Template>
  );
};

export default RoomList;
