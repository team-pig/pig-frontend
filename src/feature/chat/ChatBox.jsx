import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { body_3 } from "../../themes/textStyle";
import { hiddenScroll } from "../../themes/hiddenScroll";
import Bubble from "./Bubble";

const ChatBox = () => {
  const [chatLength, setChatLength] = useState(0);

  const user = useSelector((state) => state.user.user);
  const chat = useSelector((state) => state.chat.messages);
  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const checkMine = useCallback(
    (messageUserId) => (messageUserId === user.userId ? "my" : "common"),
    [user.userId]
  );

  useEffect(() => {
    scrollToBottom();
  }, [chatLength]);

  useEffect(() => {
    setChatLength(chat.length);
  }, [chat]);

  return (
    <Container ref={scrollRef}>
      {chat &&
        chat.length > 0 &&
        chat.map((message, idx) => (
          <Bubble message={message} type={checkMine(message.userId)} />
        ))}
    </Container>
  );
};

const Container = styled.div`
  --inputBox: 42px;

  ${hiddenScroll};
  width: 100%;
  height: calc(100% - var(--inputBox));
  padding: 0 20px;
  overflow-y: auto;
`;

export default ChatBox;
