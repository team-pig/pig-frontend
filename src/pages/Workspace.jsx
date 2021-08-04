import React from "react";
import { useRouteMatch } from "react-router-dom";

import WSRouter from "../shared/WSRouter";
import WSTabs from "../components/WSTabs";
import Template from "../components/Template";

const Workspace = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <>
      <Template>
        <div>
          <div>
            <WSTabs url={url} />
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
