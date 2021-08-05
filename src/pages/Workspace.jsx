import React from "react";
import { useRouteMatch } from "react-router-dom";

import WSRouter from "../shared/WSRouter";
import Template from "../components/Template";
import WSHeader from "../components/Workspace/WSHeader";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Template>
        <div>
          <div>
            <WSHeader url={url} />
            <section>
              <WSRouter path={path} />
            </section>
          </div>
          {/* <RoomSideBar /> */}
        </div>
      </Template>
    </>
  );
};

export default Workspace;
