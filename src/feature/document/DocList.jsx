import React from "react";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";

// elem
import { Button } from "../../elem";

const DocList = ({ docList }) => {
  const history = useHistory();
  const { roomId } = useParams();

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.aside`
  width: 200px;
  font-size: 2rem;
`;

export default DocList;
