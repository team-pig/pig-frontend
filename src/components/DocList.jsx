import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

// elem
import { Button } from "../elem";

const DocList = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];

  return (
    <div>
      <h4>문서 목록</h4>
      <ul>
        {docList.map((doc) => (
          <Link key={doc.docId} to={`/workspace/${roomId}/doc/${doc.docId}`}>
            <li>{doc.title}</li>
          </Link>
        ))}
      </ul>
      <Button _onClick={() => history.push(`/workspace/${roomId}/doc/add`)}>
        페이지 추가
      </Button>
    </div>
  );
};

export default DocList;
