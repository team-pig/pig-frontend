import React from "react";
import styled from "styled-components";

import Notice from "./Notice";
import RoomMember from "./RoomMember";
import Chat from "../../feature/chat/Chat";

const WSSidebar = () => {
  return (
    <Container>
      <Notice />
      <RoomMember />
      <Chat />
    </Container>
  );
};

const Container = styled.aside`
  --header: 48px;
  --minusHeight: calc(var(--header));

  position: fixed;
  top: 48px;
  right: 0;
  flex-shrink: 0;
  flex-grow: 0;
  width: 260px;
  height: calc(100vh - var(--minusHeight));
  border-left: 1px solid var(--line);
  background-color: var(--white);
`;

export default WSSidebar;
