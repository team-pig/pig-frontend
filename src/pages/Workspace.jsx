import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";

import WSHeader from "../components/Workspace/WSHeader";
import WSRouter from "../shared/WSRouter";

// api
import { __getDocs } from "../redux/modules/document";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();
  const { roomId } = useParams();

  const docs = useSelector((state) => state.document.docList);

  const dispatch = useDispatch();

  useEffect(() => {
    (docs.length === 0 || (docs.length !== 0 && docs[0].roomId !== roomId)) &&
      dispatch(__getDocs(roomId));
  }, []);

  return (
    <>
      <div>
        <div>
          <WSHeader url={url} />
          <section>
            <WSRouter path={path} />
          </section>
        </div>
        {/* <RoomSideBar /> */}
      </div>
    </>
  );
};

export default Workspace;
