import React from "react";
import styled from "styled-components";

import DocList from "../components/DocList";
import DocViewer from "../components/DocViewer";

const DocView = (props) => {
  return (
    <Container>
      <DocList />
      <DocViewer />
    </Container>
  );
};

const Container = styled.section`
  // 임시 스타일
  position: relative;
  z-index: 99;
`;

export default DocView;
