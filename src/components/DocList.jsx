import React from "react";
import { Link, useHistory } from "react-router-dom";

// elem
import { Button } from "../elem";

const DocList = () => {
  const history = useHistory();

  return (
    <div>
      <h4>문서 목록</h4>
      <ul>
        <Link to="/workspace/1/doc/1">
          <li>문서</li>
        </Link>
        <Link to="/workspace/1/doc/2">
          <li>문서</li>
        </Link>
        <Link to="/workspace/1/doc/3">
          <li>문서</li>
        </Link>
      </ul>
      <Button _onClick={() => history.push("/workspace/1/doc/add")}>
        페이지 추가
      </Button>
    </div>
  );
};

export default DocList;
