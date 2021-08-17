import React, { memo } from "react";
import { useSelector } from "react-redux";

const Chat = memo(({ message }) => {
  return <div>{`${message.nickname}: ${message.text}`}</div>;
});

const ChatBox = () => {
  const chat = useSelector((state) => state.chat.messages) || [];

  return (
    <>
      {chat &&
        chat.length > 0 &&
        chat.map((message, idx) => <Chat key={idx} message={message} />)}
    </>
  );
};

export default ChatBox;
