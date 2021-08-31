import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Chat from "../feature/chat/Chat";
import Icon from "../components/Icon";
import flex from "../themes/flex";
import { desktopHidden } from "../themes/responsive";
import { IconBtn, Text } from "../elem";

const ChatM = () => {
  const history = useHistory();
  const { roomId } = useParams();

  const room = useSelector((state) => state.room.roomInfos);

  useEffect(() => {
    window.addEventListener(
      "resize",
      (e) =>
        e.target.innerWidth >= 1024 && history.replace(`/workspace/${roomId}`)
    );
    return () =>
      window.addEventListener(
        "resize",
        (e) =>
          e.target.innerWidth >= 1024 && history.replace(`/workspace/${roomId}`)
      );
  }, [roomId, history]);

  return (
    <Container>
      <ChatHeader>
        <IconBtn padding="10px" _onClick={() => history.goBack()}>
          <Icon icon="arrow-left" size="20px" />
        </IconBtn>
        <Text type="body_1" color="black">
          {room.roomName}
        </Text>
        <IconBtn padding="10px" _onClick={() => history.push("/mypage")}>
          <Icon icon="my" size="20px" />
        </IconBtn>
      </ChatHeader>
      <Chat />
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --nav: 60px;

  ${desktopHidden}
  width: 100%;
  height: ${`${window.innerHeight - 48}px;`};
`;

const ChatHeader = styled.header`
  ${flex("between")}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background-color: var(--line);
  padding: 0 10px;
`;

export default ChatM;
