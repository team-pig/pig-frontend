import React from "react";
import styled from "styled-components";

// component
import Writer from "../feature/document/Writer";

const DocAdd = () => {
  return (
    <Container>
      <Writer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: var(--smMargin);
`;

export default DocAdd;
