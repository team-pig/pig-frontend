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
import RoomBlank from "../feature/room/RoomBlank";
import SearchResult from "../feature/room/SearchResult";
import BookmarkList from "../feature/room/BookmarkList";

//elements
import { Button, Input } from "../elem/index";

//redux
import {
  __getRoomList,
  __searchRoom,
  __getMarkedList,
} from "../redux/modules/room";
import SEO from "../components/SEO";

const RoomList = ({ history }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const isLoading = useSelector((state) => state.room.isLoading);
  const paging = useSelector((state) => state.room.paging);
  const searchPaging = useSelector((state) => state.room.searchPaging);
  const searchedRoom = useSelector((state) => state.room.searchedRoom);
  const userId = useSelector((state) => state.room.userId);
  const markedList = useSelector((state) => state.room.markedList);
  const searchKeyword = useSelector((state) => state.room.searchContent);
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  console.log(searchContent);

  useEffect(() => {
    dispatch(__getRoomList());
    dispatch(__getMarkedList());
  }, []);

  const changeSearchContent = (keyword) => {
    dispatch(__searchRoom(keyword));
    setSearchContent(keyword);
  };

  const delay = _.debounce(changeSearchContent, 500);

  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

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
  const searchItem =
    searchedRoom &&
    searchedRoom.map((room, idx) => {
      console.log("searchItem");
      const userIdList = room.bookmarkedMembers.map((member, index) => {
        return member.userId;
      });

      const isCheck = userIdList.includes(userId);

      return (
        <RoomCard
          isCheck={isCheck}
          userId={userId}
          openDrop={openDrop}
          closeDrop={closeDrop}
          isShow={isShow}
          key={room.roomId}
          {...room}
          history={history}
        />
      );
    });

  // filter로 검색키워드 없을 때만 나타남
  const notSearchItem = roomList
    .filter((item) => {
      console.log("notSearchItem");
      if (searchContent === null || searchContent === "") {
        return item;
      }
    })
    .map((room, idx) => {
      const userIdList = room.bookmarkedMembers.map((member, index) => {
        return member.userId;
      });

      const isCheck = userIdList.includes(userId);
      console.log(isCheck);
      return (
        <RoomCard
          isCheck={isCheck}
          key={room.roomId}
          {...room}
          history={history}
        />
      );
    });

  return (
    <>
      <SEO title="협업 방 목록" />
      <Template>
        {!isJoin && (
          <AddRoomModal showModal={showModal} closeModal={closeModal} />
        )}
        {isJoin && (
          <JoinRoomModal showModal={showModal} closeModal={closeModal} />
        )}
        <SearchResult
          delay={delay}
          _onKeyPress={_onKeyPress}
          openJoinModal={openJoinModal}
          openModal={openModal}
          searchItem={searchItem}
        />
        <InfinityScroll
          callNext={() => {
            console.log("next");
            dispatch(__getRoomList(paging.next));
          }}
          isNext={paging.next || searchPaging.next ? true : false}
          isLoading={isLoading}
        >
          {roomList.length < 1 ? <RoomBlank /> : ""}
          {!searchContent && markedList && markedList.length > 0 ? (
            <BookmarkList
              markedList={markedList}
              userId={userId}
              openDrop={openDrop}
              closeDrop={closeDrop}
              isShow={isShow}
              history={history}
            />
          ) : (
            ""
          )}

          <RoomContainer>
            <RoomBox>{notSearchItem}</RoomBox>
          </RoomContainer>
        </InfinityScroll>
      </Template>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 155px;
`;

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  padding: 0 80px;
  margin: 5px auto 0 auto;
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const InputBox = styled.div`
  position: relative;
  flex: 1;
  height: 46px;
  margin: auto 0;
  ${({ theme }) => theme.device.mobile} {
    order: 0 !important;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 46px;
  padding-left: 45px;
  border: 1px solid var(--line);
`;

const SearchIconBox = styled.div`
  position: absolute;
  z-index: 28;
  top: 25%;
  left: 18px;
  color: var(--darkgrey);
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  margin: 0 0 0 7px;
`;

const BtnContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const BtnBox = styled.div`
  position: relative;
  height: 50px;
  /* margin-left: -1px; */
  margin-left: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  width: 330px;
  height: 50px;
  margin-left: 40px;

  ${({ theme }) => theme.device.mobile} {
    order: 1 !important;
    width: 100%;
    margin: 10px 0 0 0;
  }
`;

const BookmarkContainer = styled.div`
  display: flex;
  overflow-y: auto;
  -ms-overflow-style: none;
  height: 299px;
  margin-bottom: 25px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BookmarkBox = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--line);

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RoomContainer = styled.div`
  display: flex;
  margin-top: 25px;
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
