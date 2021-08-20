import React from "react";
import styled, { css } from "styled-components";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import { body_4 } from "../../themes/textStyle";

const Bubble = ({ message, type }) => {
  const getTime = (submitTime) => {
    const timeAry = submitTime.split("/")[1].split(" ");
    const meridiem = timeAry[0] === "am" ? "오전" : "오후";
    const time = `${meridiem} ${timeAry[1]}`;
    return time;
  };

  if (type === "my") {
    return (
      <MyChat>
        <Date>{message.submitTime && getTime(message.submitTime)}</Date>
        <MyBubble>
          <Text type="body_4" color="white">
            {message.text}
          </Text>
        </MyBubble>
      </MyChat>
    );
  }
  if (type === "common") {
    return (
      <CommonChat>
        <Left>
          <ProfileImg />
        </Left>
        <Right>
          <MessageInfo>
            <Name>{message.userName}</Name>
            <Date>{message.submitTime && getTime(message.submitTime)}</Date>
          </MessageInfo>
          <CommonBubble>{message.text}</CommonBubble>
        </Right>
      </CommonChat>
    );
  }
};

const ChatStyle = css`
  margin-top: 10px;
`;

const MyChat = styled.div`
  ${ChatStyle};
  ${flex("start", "end", false)};
`;

const CommonChat = styled.div`
  ${ChatStyle};
  ${flex("start", "start", "false")};
`;

const BubbleStyle = css`
  ${body_4};
  padding: 8px 10px;
  border-radius: 4px;
`;

const MyBubble = styled.div`
  ${BubbleStyle};
  color: var(--white);
  background-color: var(--main);
`;

const CommonBubble = styled.div`
  ${BubbleStyle};
  color: var(--black);
  background-color: var(--line);
`;

const MessageInfo = styled.div`
  ${flex()};
`;

const Left = styled.div`
  margin-right: 10px;
`;

const Right = styled.div`
  ${flex("start", "start", false)};
  margin-top: -2px;
`;

const Name = styled.div`
  margin-right: 4px;
  color: var(--black);
  font-size: 1.1rem;
  line-height: 1.8rem;
`;

const Date = styled.div`
  font-size: 1.1rem;
  line-height: 1.8rem;
  color: var(--grey);
`;

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: url("https://images.unsplash.com/photo-1629388684419-9001049809be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
  background-size: cover;
`;

export default Bubble;
