import React, { useState, useCallback } from "react";
import styled from "styled-components";

import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

const Chat = () => {
  return (
    <Container>
      <ChatBox />
      <ChatInput />
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;
  --notice: 48px; // 현재 비활성화
  --members: 48px;
  --minusHeight: calc(var(--header) + var(--members));

  position: relative;
  width: 100%;
  height: calc(100vh - var(--minusHeight));
  overflow: hidden;
`;

export default Chat;
