import React from "react";

// toast UI viewer
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import "../themes/toastEditor.css";

const MarkDownViewer = ({ option }) => {
  const viewerOpt = {
    initialValue: "",
    ...option,
  };

  return <Viewer {...viewerOpt}></Viewer>;
};

export default MarkDownViewer;
