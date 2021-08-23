import React from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

const StatusSection = () => {
  return (
    <Container>
      <ProjectStatus />
      <Members />
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --minusHeight: calc(var(--header));
  width: 350px;
  height: calc(100vh - var(--minusHeight));
  border-right: 1px solid var(--line);
`;

export default React.memo(StatusSection);
