import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// component
import DocList from "../feature/document/DocList";

// elem
import { Button } from "../elem";

const DocBlank = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const docList = useSelector((state) => state.document.docList) || [];

  if (docList.length > 0) {
    history.replace(
      `/workspace/${roomId}/doc/${docList[docList.length - 1].docId}`
    );
  }

  return (
    <Container>
      <DocList docList={[]} />
      <Content>
        <p>아직 작성한 문서가 없습니다.</p>
        <Button _onClick={() => history.push(`/workspace/${roomId}/doc/add`)}>
          첫 문서 작성하기
        </Button>
      </Content>
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
  gap: 20px;
  padding-top: 20px;
`;

const Content = styled.section`
  font-size: 2rem;
  flex-grow: 1;
`;

export default DocBlank;
