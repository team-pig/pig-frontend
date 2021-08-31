import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// component
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

// redux & api
import { __loadMembers } from "../../redux/modules/members";

const Chat = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__loadMembers(roomId));
  }, [dispatch, roomId]);

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

  ${({ theme }) => theme.device.tablet} {
    height: 100%;
  }

  ${({ theme }) => theme.device.mobile} {
    height: calc(100% - 60px);
  }
`;

export default Chat;
