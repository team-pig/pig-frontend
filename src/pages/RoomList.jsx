import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

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
import {
  __getRoomList,
  __searchRoom,
  __getMarkedList,
  __getUnMarkedList,
} from "../redux/modules/room";

const RoomList = ({ history }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const isLoading = useSelector((state) => state.room.isLoading);
  const paging = useSelector((state) => state.room.paging);
  const searchedRoom = useSelector((state) => state.room.searchedRoom);
  const userId = useSelector((state) => state.room.userId);
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [searchContent, setSearchContent] = useState(null);

  useEffect(() => {
    // if (roomList.length === 0) {
    //   dispatch(__getRoomList());
    //   dispatch(__getMarkedList());
    //   dispatch(__getUnmarkedList());
    // }
    dispatch(__getRoomList());
    dispatch(__getMarkedList());
    dispatch(__getUnMarkedList());
  }, []);

  const changeSearchContent = (e) => {
    const keyword = e.target.value;
    setSearchContent(keyword);
    dispatch(__searchRoom(searchContent));
  };

  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

  const searchKeyword = _.debounce(changeSearchContent, 150);

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

  //enter
  const searchItem = searchedRoom
    .filter((item) => {
      if (item.roomName.includes(searchContent)) {
        return item;
      }
    })
    .map((room, idx) => {
      
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
    });

  const notSearchItem = roomList
    .filter((item) => {
      if (searchContent === null) {
        return item;
      }
      // else if(item.roomName.toLowerCase().includes(searchContent.toLowerCase())){
      //   return item}
    })
    .map((room, idx) => {
      // const markIdx = roomList.findIndex((item) => 
      // item.bookmarkedMembers.includes(userId));
      
      const isCheck = room.bookmarkedMembers.includes(userId);
      return (
        <RoomCard
          isMarked={isCheck ? true : false}
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
    });

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
              <input
                onKeyUp={searchKeyword}
                onKeyPress={_onKeyPress}
                type="text"
                name="keyword"
                placeholder="방 이름을 검색하세요"
              />
              {/* <IconBox>
                  <Icon icon="search" size="24px" />
                </IconBox>
              </Input> */}
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
            {searchContent === null ? notSearchItem : searchItem}

            {/* {searchItem} */}
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
