import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//components
import Template from "../components/Template";
import AddRoomModal from "../feature/room/AddRoomModal";
import JoinRoomModal from "../feature/room/JoinRoomModal";
import RoomBlank from "../feature/room/RoomBlank";
import SearchResult from "../feature/room/SearchResult";
import BookmarkList from "../feature/room/BookmarkList";
import SearchBar from "../feature/room/SearchBar";
import DefaultRoomList from "../feature/room/DefaultRoomList";

//redux
import {
  __getRoomList,
  __getMarkedList,
  initRoom,
} from "../redux/modules/room";
import SEO from "../components/SEO";
import { initMyTodos } from "../redux/modules/todos";
import { initBoard } from "../redux/modules/board";
import JoyrideContainer from "../feature/tutorial/JoyrideContainer";
import { roomListSteps } from "../feature/tutorial/tutorialSteps";

const RoomList = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const { room, searchKeyword } = useSelector((state) => state.room) || [];
  const tutorial = useSelector((state) => state.user.tutorial);

  const roomBlankImg = useCallback(() => {
    if (room && room.length > 0) {
      setShowImg(false);
    } else {
      setShowImg(true);
    }
  }, [room]);

  useEffect(() => {
    const getRoom = async () => {
      const __getRoom = await dispatch(__getRoomList());
      dispatch(__getMarkedList());
      roomBlankImg();
    };
    getRoom();

    dispatch(initRoom({}));
    dispatch(initBoard());
    dispatch(initMyTodos());
  }, [room]);

  const joinModal = useCallback(() => {
    setShowModal((pre) => !pre);
    setIsJoin(true);
  }, []);

  const addModal = useCallback(() => {
    setShowModal((pre) => !pre);
    setIsJoin(false);
  }, []);

  // Joyride(튜토리얼)
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    if (tutorial && tutorial["roomlist"] === true && isShowTutorial === false) {
      setIsShowTutorial(true);
    }
  }, [tutorial, isShowTutorial]);

  return (
    <>
      <SEO title="협업 방 목록" />
      {isShowTutorial && (
        <JoyrideContainer
          run={isShowTutorial}
          setRun={setIsShowTutorial}
          steps={roomListSteps}
          page="roomlist"
        />
      )}
      <Template>
        <Container>
          {!isJoin && (
            <AddRoomModal showModal={showModal} addModal={addModal} />
          )}
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
        </Container>
      </Template>
    </>
  );
};

const Container = styled.div``;
export default React.memo(RoomList);
