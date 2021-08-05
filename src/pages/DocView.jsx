import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

// component
import DocList from "../feature/document/DocList";
import DocViewer from "../feature/document/DocViewer";

const DocView = (props) => {
  const docList = useSelector((state) => state.document.docList) || [];

  return (
    <Container>
      <DocList docList={docList} />
      <DocViewer />
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  display: flex;
`;

export default DocView;
