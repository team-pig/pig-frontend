import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//components
import Template from "../components/Template";
import AddRoomModal from "../feature/room/AddRoomModal";
import JoinRoomModal from "../feature/room/JoinRoomModal";
import RoomCard from "../feature/room/RoomCard";
import InfinityScroll from "../components/InfinityScroll";

//elements
import Button from "../elem/Button";

//redux
import { __getRoomList } from "../redux/modules/room";

const RoomList = ({ history }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const isLoading = useSelector((state) => state.room.isLoading);
  const paging = useSelector((state) => state.room.paging);
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    if (roomList.length === 0) {
      dispatch(__getRoomList());
    }
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
      <InfinityScroll
        callNext={() => {
          console.log("next");
          dispatch(__getRoomList(paging.next));
        }}
        isNext={paging.next ? true : false}
        isLoading={isLoading}
      >
        <RoomContainer>
          {roomList.map((room, idx) => {
            return <RoomCard key={idx} {...room} history={history} />;
          })}
        </RoomContainer>
      </InfinityScroll>
    </Template>
  );
};

const RoomContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export default RoomList;
