import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//components
import Template from "../components/Template";
import AddRoomModal from "../feature/room/AddRoomModal";
import JoinRoomModal from "../feature/room/JoinRoomModal";
import RoomCard from "../feature/room/RoomCard";
import InfinityScroll from "../components/InfinityScroll";
import Icon from "../components/Icon";

//elements
import { Button, Input } from "../elem/index";

//redux
import { __getRoomList } from "../redux/modules/room";

const RoomList = ({ history }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const isLoading = useSelector((state) => state.room.isLoading);
  const paging = useSelector((state) => state.room.paging);
  const userId = useSelector((state) => state.room.userId);
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isShow, setIsShow] = useState(false);

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

  const openDrop = () => {
    setIsShow(true);
  };

  const closeDrop = () => {
    setIsShow(false);
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
            <InputBox>
              <Input type="text" value="">
                <IconBox>
                  <Icon icon="search" size="24px" />
                </IconBox>
              </Input>
            </InputBox>
            <BtnBox>
              <Button size="150" onClick={openJoinModal}>
                방 입장
              </Button>
              <Button shape="green-outline" size="150" onClick={openModal}>
                방 만들기
              </Button>
            </BtnBox>
          </WrapperItem>
        </Wrapper>

        <RoomContainer onClick={closeDrop}>
          <RoomBox>
            {roomList.map((room, idx) => {
              return (
                <RoomCard
                  userId={userId}
                  openDrop={openDrop}
                  closeDrop={closeDrop}
                  isShow={isShow}
                  index={idx}
                  key={idx}
                  {...room}
                  history={history}
                />
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
  height: 155px;
`;

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1286px;
  margin: 5px auto 0 auto;
`;

const InputBox = styled.div`
  width: 918px;
  height: 46px;
  margin: auto 0;
`;

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  left: 5px;
`;

const BtnBox = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 50px;
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
