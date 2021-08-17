import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Icon from "../Icon";
import flex from "../../themes/flex";
import { body_3 } from "../../themes/textStyle";
import { IconBtn } from "../../elem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  joinRoom,
  leaveRoom,
  subscribeToChat,
  sendMessage,
} from "../../shared/useSocket";

const Chat = () => {
  const { roomId } = useParams();
  const { userId, nickname } = useSelector((state) => state.user.user);

  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(roomId);

    if (roomId && nickname) {
      joinRoom(roomId, nickname);
    }

    subscribeToChat((err, data) => {
      if (err) console.log(err);
      console.log(data);
      setChat((chat) => [...chat, data]);
    });

    return () => leaveRoom(roomId, nickname);
  }, [roomId, nickname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(roomId, nickname, text);
    setText("");
  };

  return (
    <Container>
      <div>
        {chat.length > 0 &&
          chat.map((message, idx) => (
            <div key={idx}>{`${message.nickname}: ${message.text}`}</div>
          ))}
      </div>
      <InputBox onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          placeholder="메세지를 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconBtn>
          <Icon icon="smile" size="20px" color="var(--grey)" />
        </IconBtn>
      </InputBox>
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;
  --notice: 48px;
  --members: 48px;
  --minusHeight: calc(var(--header) + var(--notice) + var(--members));

  position: relative;
  width: 100%;
  height: calc(100vh - var(--minusHeight));
  overflow: hidden;
`;

const InputBox = styled.form`
  ${flex("between", "center")};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 42px;
  padding: 0 4px;
  margin-left: -1px;
  border: 1px solid var(--line);
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
`;

const ChatInput = styled.input`
  ${body_3};
  flex-grow: 1;
  color: var(--black);
  padding: 0 10px;

  &::placeholder {
    ${body_3};
    color: var(--grey);
  }
`;

export default Chat;
