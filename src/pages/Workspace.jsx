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
import { loadMessages, resetMessages } from "../redux/modules/chat";

// socket
import { joinRoom, leaveRoom, getMessages } from "../shared/useSocket";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();
  const { roomId } = useParams();

  const dispatch = useDispatch();

  const { userId, nickname } = useSelector((state) => state.user.user);
  const docs = useSelector((state) => state.document.docList);
  const room = useSelector((state) => state.room.currentRoom);

  useEffect(() => {
    (docs.length === 0 || (docs.length !== 0 && docs[0].roomId !== roomId)) &&
      dispatch(__getDocs(roomId));
    dispatch(__getOneRoom(roomId));
  }, [dispatch, roomId]);

  // workspace를 나갈 때마다 store의 message가 reset되도록 함
  useEffect(() => {
    return () => {
      dispatch(resetMessages());
    };
  }, [dispatch]);

  // workspace에 들어갈 때마다 room에 join, 해당 방의 기존 메세지 받아오는 handler
  useEffect(() => {
    if (roomId && nickname) {
      joinRoom(roomId, nickname);
    }

    getMessages((err, data) => {
      if (err) console.log(err);
      dispatch(loadMessages(data));
    });
  }, [dispatch, roomId, nickname]);

  // workspace에서 나갈 때 room에서 leave
  useEffect(() => {
    return () => leaveRoom(roomId, nickname);
  }, [roomId, nickname]);

  return (
    <>
      <SEO title={room.roomName} />
      <div>
        <WSHeader url={url} />
        <WSTemplate>
          <WSRouter path={path} />
          <WSSidebar />
        </WSTemplate>
      </div>
    </>
  );
};

export default Workspace;
