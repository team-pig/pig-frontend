import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

import WSHeader from "../components/Workspace/WSHeader";
import WSRouter from "../shared/WSRouter";
import WSSidebar from "../components/WSSidebar.jsx/WSSidebar";

// api
import WSTemplate from "../components/Workspace/WSTemplate";
import { __getDocs } from "../redux/modules/document";
import { __getOneRoom } from "../redux/modules/room";
import SEO from "../components/SEO";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();
  const { roomId } = useParams();

  const docs = useSelector((state) => state.document.docList);
  const room = useSelector((state) => state.room.currentRoom);

  const dispatch = useDispatch();

  useEffect(() => {
    (docs.length === 0 || (docs.length !== 0 && docs[0].roomId !== roomId)) &&
      dispatch(__getDocs(roomId));
    dispatch(__getOneRoom(roomId));
  }, [dispatch]);

  return (
    <>
      <SEO title={room.roomName} />
      <div>
        <WSHeader url={url} />
        <WSTemplate>
          <WSRouter path={path} />
          {/* <WSSidebar /> */}
        </WSTemplate>
      </div>
    </>
  );
};

export default Workspace;
