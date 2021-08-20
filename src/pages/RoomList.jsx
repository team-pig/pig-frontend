import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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

  useEffect(() => {
    dispatch(__getRoomList());
    dispatch(__getMarkedList());
  }, []);

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
        <RoomBlank />
        <BookmarkList />
        <SearchResult />
        <DefaultRoomList />
      </Template>
    </>
  );
};

export default RoomList;
