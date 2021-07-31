import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// component
import DocList from "../components/DocList";
import Template from "../components/Template";

// redux
import { __getDocs } from "../redux/modules/document";

// elem
import { Button } from "../elem";

const DocBlank = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const dispatch = useDispatch();

  const docList = useSelector((state) => state.document.docList) || [];

  useEffect(() => {
    dispatch(__getDocs(roomId));
  }, []);

  if (docList.length > 0) {
    history.replace(
      `/workspace/${roomId}/doc/${docList[docList.length - 1].docId}`
    );
  }

  return (
    <Template>
      <Container>
        <DocList docList={[]} />
        <section>
          <p>아직 작성한 문서가 없습니다.</p>
          <Button _onClick={() => history.push(`/workspace/${roomId}/doc/add`)}>
            첫 문서 작성하기
          </Button>
        </section>
      </Container>
    </Template>
  );
};

// 임시 스타일
const Container = styled.section`
  position: relative;
  z-index: 99;
`;

export default DocBlank;
