import React from "react";
import { useRouteMatch } from "react-router-dom";

import WSRouter from "../shared/WSRouter";
import WSTabs from "../components/WSTabs";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <>
      {/* Room 별도 헤더가 있는 경우 */}
      {/* <RoomHeader /> */}
      <div>
        <div>
          <WSTabs url={url} />
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
