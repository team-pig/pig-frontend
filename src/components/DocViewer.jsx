import React from "react";

// toast UI viewer
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

const DocViewer = () => {
  // 현재 문서의 html형태 string을 불러와서 initialValue로 보여줘야 함.
  const viewerOpt = {
    // 더미 데이터
    // initialValue: "<h1>123456</h1>\n\r<h2>gkgkgkgk</h2>\n\r<p>zzzzz</p>",
  };

  return <Viewer {...viewerOpt}></Viewer>;
};

export default DocViewer;
