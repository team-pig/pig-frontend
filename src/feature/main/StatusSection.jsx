import React, { useEffect, useState } from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

// redux
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __loadAllStatus, initAllStatus } from "../../redux/modules/dashBoard";

const StatusSection = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadAllStatus(roomId));
    return () => dispatch(initAllStatus());
  }, []);

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

  width: 425px;
  height: calc(100vh - var(--minusHeight));
  border-right: 1px solid var(--line);
`;

export default React.memo(StatusSection);
