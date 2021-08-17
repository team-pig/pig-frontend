import React, { memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { body_3 } from "../../themes/textStyle";

const Chat = memo(({ message }) => {
  return <Bubble>{`${message.nickname}: ${message.text}`}</Bubble>;
});

const ChatBox = () => {
  const chat = useSelector((state) => state.chat.messages) || [];

  return (
    <Container>
      {chat &&
        chat.length > 0 &&
        chat.map((message, idx) => <Chat key={idx} message={message} />)}
    </Container>
  );
};

const Container = styled.div`
  --inputBox: 42px;

  width: 100%;
  height: calc(100% - var(--inputBox));
`;

const Bubble = styled.div`
  ${body_3};
`;

export default ChatBox;
