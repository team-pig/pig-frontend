import React, { useState } from "react";
import styled from "styled-components";
import flex from "../themes/flex";

import StatusSection from "../feature/main/StatusSection";
import Information from "../feature/main/Information";
import MyTodos from "../feature/main/myTodos/MyTodos";

const Main = () => {
  return (
    <Container>
      <LeftSide>
        <StatusSection />
      </LeftSide>
      <RightSide>
        <Information />
        <MyTodos />
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --minusHeight: calc(var(--header));

  ${flex("start", "start")};
  width: 100%;
  height: calc(100vh - var(--minusHeight));
`;

const LeftSide = styled.section`
  flex-shrink: 0;
  width: 425px;
  height: 100%;
`;

const RightSide = styled.section`
  --leftSide: 425px;

  ${flex("start", "start", false)};
  width: calc(100% - var(--leftSide));
  height: 100%;
`;

export default Main;
