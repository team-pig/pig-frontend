import React from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

const StatusSection = () => {
  return (
    <Container className="status">
      <ProjectStatus />
      <Members />
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --minusHeight: calc(var(--header));
  grid-area: Status;
  border-right: 1px solid var(--line);
  background-color: var(--white);

  ${({ theme }) => theme.device.mobile} {
    height: 100%;
    border-bottom: 1px solid var(--line);
    border-right: 0;
  }
`;

export default React.memo(StatusSection);
