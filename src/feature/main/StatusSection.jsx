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
  border-right: 1px solid var(--line);
  grid-area: Status;

  ${({ theme }) => theme.device.mobile} {
    height: 100%;
    border-bottom: 1px solid var(--line);
    border-right: 0;
  }
`;

export default React.memo(StatusSection);
