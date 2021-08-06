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
        <Wrapper>
          <WrapperItem>
            <InputCover>
              <InputItem />
            </InputCover>
            <BtnBox>
              <Btn onClick={openJoinModal}>방 참여</Btn>
              <Btn onClick={openModal}>방 생성하기</Btn>
            </BtnBox>
          </WrapperItem>
        </Wrapper>

        <RoomContainer>
          <RoomBox>
            {roomList.map((room, idx) => {
              return (
                <RoomCard index={idx} key={idx} {...room} history={history} />
              );
            })}
          </RoomBox>
        </RoomContainer>
      </InfinityScroll>
    </Template>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* justify-content: space-between;
  align-items: center; */
  height: 100px;
  border: 2px solid pink;
`;

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1286px;
  /* min-width: 630px; */
  margin: 0 auto;
  border: 2px solid red;
`;

const InputCover = styled.div`
  height: 48px;
  border: 20px solid var(--dark grey);
  border-radius: 3px;
`;

const InputItem = styled.input`
  height: 48px;
  border: 3px solid var(--dark grey);
  border-radius: 3px;
`;
const BtnBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 50px;
  border: 2px solid black;
`;
const Btn = styled.button`
  width: 150px;
  height: 50px;
  border: 2px solid black;
`;

const RoomContainer = styled.div`
  display: flex;
`;

const RoomBox = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default RoomList;
