import React from "react";

import DocList from "../components/DocList";
import DocViewer from "../components/DocViewer";

const DocView = (props) => {
  return (
    <>
      <DocList />
      <DocViewer />
    </>
  );
};

export default DocView;
