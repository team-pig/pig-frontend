import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// component
import Writer from "../feature/document/Writer";
import Template from "../components/Template";

const DocEdit = () => {
  const { docId } = useParams();

  const targetDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex((doc) => doc.docId === docId);
    return state.document.docList[idx];
  });

  return (
    <Container>
      <Writer targetDoc={targetDoc} />
    </Container>
  );
};

const Container = styled.div`
  padding: var(--smMargin);
`;

export default DocEdit;
