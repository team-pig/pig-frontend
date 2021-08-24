import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

import WSHeader from "../components/Workspace/WSHeader";
import WSRouter from "../shared/WSRouter";
import WSSidebar from "../components/WSSidebar.jsx/WSSidebar";
import WSTemplate from "../components/Workspace/WSTemplate";
import SEO from "../components/SEO";

// redux & api
import { __getDocs } from "../redux/modules/document";
import { __getOneRoom } from "../redux/modules/room";
import {
  loadMessages,
  resetMessages,
  setPrevRoomId,
} from "../redux/modules/chat";
import { __loadBucket, __loadCard } from "../redux/modules/board";
import { __loadMyTodos, __loadProjectTodo } from "../redux/modules/todos";

// socket
import { joinRoom, leaveRoom, getMessages } from "../shared/useSocket";

const Workspace = (props) => {
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  const { roomId } = useParams();
  const { userId, nickname } = useSelector((state) => state.user.user);
  const docs = useSelector((state) => state.document.docList);
  const room = useSelector((state) => state.room.currentRoom);
  const prevRoomId = useSelector((state) => state.chat.prevLoadRoomId);

  useEffect(() => {
    (docs.length === 0 || (docs.length !== 0 && docs[0].roomId !== roomId)) &&
      dispatch(__getDocs(roomId)); // 문서
    dispatch(__loadBucket(roomId)); // 보드 (버킷 정보)
    dispatch(__loadCard(roomId)); // 보드 (카드 정보)
    dispatch(__getOneRoom(roomId)); // 메인 (방 상세 정보)
    dispatch(__loadMyTodos(roomId)); // 메인 (투두리스트)
    dispatch(__loadProjectTodo(roomId)); // 메인 (대시보드)
  }, [dispatch, roomId]);

  // workspace에 들어갈 때마다 room에 join, 해당 방의 기존 메세지 받아오는 handler
  useEffect(() => {
    if (roomId && nickname && userId && room && room.roomName) {
      joinRoom(roomId, nickname, userId, room.roomName);
    }
  }, [dispatch, roomId, nickname, userId, room]);

  useEffect(() => {
    getMessages((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (prevRoomId !== roomId) {
        dispatch(setPrevRoomId(roomId));
        dispatch(loadMessages(data));
        return;
      }
    });
  }, [prevRoomId, roomId, dispatch]);

  // workspace에서 나갈 때 room에서 leave
  useEffect(() => {
    return () => {
      leaveRoom(roomId, nickname, userId);
    };
  }, [roomId, nickname, userId, dispatch]);

  return (
    <>
      <SEO title={room.roomName} />
      <>
        <WSHeader url={url} />
        <WSTemplate>
          <WSRouter path={path} />
          <WSSidebar />
        </WSTemplate>
      </>
    </>
  );
};

export default React.memo(Workspace);
