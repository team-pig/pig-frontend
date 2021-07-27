import React from "react";
import { Button } from "../elem";

const DocList = () => {
  return (
    <div>
      <h4>문서 목록</h4>
      <ul>
        <li>문서</li>
        <li>문서</li>
        <li>문서</li>
      </ul>
      <Button>페이지 추가</Button>
    </div>
  );
};

export default DocList;
