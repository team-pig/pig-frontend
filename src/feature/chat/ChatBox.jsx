import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { body_3 } from "../../themes/textStyle";
import { hiddenScroll } from "../../themes/hiddenScroll";

const Chat = ({ message }) => {
  return <Bubble>{`${message.userName}: ${message.text}`}</Bubble>;
};

const ChatBox = () => {
  const [chatLength, setChatLength] = useState(0);

  const chat = useSelector((state) => state.chat.messages);
  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

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
        chat.map((message, idx) => <Chat key={idx} message={message} />)}
    </Container>
  );
};

const Container = styled.div`
  --inputBox: 42px;

  ${hiddenScroll};
  width: 100%;
  height: calc(100% - var(--inputBox));
  overflow-y: auto;
`;

const Bubble = styled.div`
  ${body_3};
`;

export default ChatBox;
