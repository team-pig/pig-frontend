import React from "react";
import { useRouteMatch } from "react-router-dom";

import WSHeader from "../components/Workspace/WSHeader";
import WSRouter from "../shared/WSRouter";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();

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
