import React from "react";
import { useRouteMatch } from "react-router-dom";

import WSRouter from "../shared/WSRouter";

const Workspace = (props) => {
  let { path } = useRouteMatch();

  return (
    <>
      {/* Room 별도 헤더가 있는 경우 */}
      {/* <RoomHeader /> */}
      <div>
        <div>
          {/* <RoomTabs /> */}
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
