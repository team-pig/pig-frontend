import React from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

// redux
import { useSelector } from "react-redux";

const StatusSection = () => {
  const { projectStatus, memberStatus } = useSelector(
    (state) => state.dashBoard
  );

  console.log(memberStatus);
  //가짜 데이터
  const project = {
    totalTodos: 120,
    completedTodos: 99,
  };

  if (memberStatus.length === 0) return <div></div>;
  return (
    <Container>
      <ProjectStatus projectStatus={projectStatus} />
      <Members memberStatus={memberStatus} />
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --minusHeight: calc(var(--header));

  width: 425px;
  height: calc(100vh - var(--minusHeight));
  border-right: 1px solid var(--line);
`;

export default StatusSection;
