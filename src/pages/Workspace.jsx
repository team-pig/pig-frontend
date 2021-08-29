import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

import WSHeader from "../components/Workspace/WSHeader";
import WSRouter from "../shared/WSRouter";
import WSSidebar from "../components/WSSidebar.jsx/WSSidebar";
import WSTemplate from "../components/Workspace/WSTemplate";
import SEO from "../components/SEO";
import Header from "../components/Header";

// redux & api
import { __getDocs } from "../redux/modules/document";
import { __getOneRoom } from "../redux/modules/room";
import { __loadProjectTodo } from "../redux/modules/todos";
import { loadMessages, setPrevRoomId } from "../redux/modules/chat";

// socket
import { joinRoom, leaveRoom, getMessages } from "../shared/useSocket";

import { mobileHidden, mobileOnly } from "../themes/responsive";
import WSMobileNav from "../components/Workspace/WSMobileNav";

const Workspace = () => {
  const dispatch = useDispatch();
  let { path, url } = useRouteMatch();
  const { roomId } = useParams();
  const { userId, nickname } = useSelector((state) => state.user.user);
  const docs = useSelector((state) => state.document.docList);
  const room = useSelector((state) => state.room.currentRoom);
  const { prevLoadRoomId: prevRoomId, socket } = useSelector(
    (state) => state.chat
  );
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    (docs.length === 0 || (docs.length !== 0 && docs[0].roomId !== roomId)) &&
      dispatch(__getDocs(roomId)); // 문서
    dispatch(__getOneRoom(roomId));
    dispatch(__loadProjectTodo(roomId)); // 메인, 보드, 타임라인
  }, [dispatch, roomId]);

  // workspace에 들어갈 때마다 room에 join, 해당 방의 기존 메세지 받아오는 handler
  useEffect(() => {
    if (socket && prevRoomId !== roomId) {
      joinRoom(roomId, nickname, userId, room.roomName);
      setIsJoin(true);
    }
  }, [socket, roomId, nickname, userId, room, prevRoomId]);

  useEffect(() => {
    getMessages((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      if (isJoin) {
        dispatch(setPrevRoomId(roomId));
        dispatch(loadMessages(data));
      }
    });
  }, [prevRoomId, roomId, dispatch, isJoin]);

  // workspace에서 나갈 때 room에서 leave
  useEffect(() => {
    return () => {
      leaveRoom(roomId, nickname, userId);
      dispatch(setPrevRoomId(null));
      dispatch(loadMessages([]));
    };
  }, [roomId, nickname, userId, dispatch]);

  return (
    <>
      <SEO title={room.roomName} />
      <HiddenMobile>
        <WSHeader url={url} />
      </HiddenMobile>
      <OnlyMobile>
        <Header />
      </OnlyMobile>

      <WSTemplate>
        <WSRouter path={path} />
        <HiddenMobile>
          <WSSidebar />
        </HiddenMobile>
      </WSTemplate>

      <WSMobileNav url={url} />
    </>
  );
};

const OnlyMobile = styled.div`
  ${mobileOnly}
`;

const HiddenMobile = styled.div`
  ${mobileHidden}
`;

export default React.memo(Workspace);
