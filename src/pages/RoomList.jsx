import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Template from "../components/Template";
import AddRoomModal from "../feature/room/AddRoomModal";
import JoinRoomModal from "../feature/room/JoinRoomModal";
import RoomBlank from "../feature/room/RoomBlank";
import SearchResult from "../feature/room/SearchResult";
import BookmarkList from "../feature/room/BookmarkList";
import SearchBar from "../feature/room/SearchBar";
import DefaultRoomList from "../feature/room/DefaultRoomList";

//elements

//redux
import { __getRoomList, __getMarkedList } from "../redux/modules/room";
import SEO from "../components/SEO";

const RoomList = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const { room, searchKeyword } = useSelector((state) => state.room) || [];

  useEffect(() => {
    const getRoom = async () => {
      const __getRoom = await dispatch(__getRoomList());
      dispatch(__getMarkedList());
      roomBlankImg();
    };
    getRoom();
  }, [room]);

  const roomBlankImg = () => {
    if (room && room.length > 0) {
      setShowImg(false);
    } else {
      setShowImg(true);
    }
  };

  const joinModal = () => {
    setShowModal((pre) => !pre);
    setIsJoin(true);
  };

  const addModal = () => {
    setShowModal((pre) => !pre);
    setIsJoin(false);
  };

  return (
    <>
      <SEO title="협업 방 목록" />
      <Template>
        {!isJoin && <AddRoomModal showModal={showModal} addModal={addModal} />}
        {isJoin && (
          <JoinRoomModal showModal={showModal} joinModal={joinModal} />
        )}
        <SearchBar joinModal={joinModal} addModal={addModal} />
        {showImg && <RoomBlank />}
        {searchKeyword && searchKeyword.length > 0 ? (
          ""
        ) : (
          <>
            <BookmarkList />
            <DefaultRoomList />
          </>
        )}
        <SearchResult />
      </Template>
    </>
  );
};

export default RoomList;
