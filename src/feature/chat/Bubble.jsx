import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

// elem & style
import flex from "../../themes/flex";
import { body_4, button } from "../../themes/textStyle";
import { Text } from "../../elem";

const Bubble = ({ message, type }) => {
  const members = useSelector((state) => state.members.members);

  const getTime = (submitTime) => {
    const timeAry = submitTime.split("/")[1].split(" ");
    const meridiem = timeAry[0] === "am" ? "오전" : "오후";
    const time = `${meridiem} ${timeAry[1]}`;
    return time;
  };

  const target = members.find((member) => member.memberId === message.userId);

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
          {target && target.avatar && <ProfileImg target={target} />}
          {target && target.memberName && !target.avatar && (
            <ProfileImg target={target}>{target.memberName[0]}</ProfileImg>
          )}
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
  ${flex()};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  ${(props) => {
    if (props.target.avatar) {
      return css`
        background-image: ${(props) => `url(${props.target.avatar});`};
        background-size: cover;
        background-position: center center;
      `;
    }
    return css`
      ${button};
      color: ${(props) => {
        if (props.target.color === "mint" || props.target.color === "yellow") {
          return "var(--darkgrey);";
        }
        return "var(--white);";
      }}
      background-color: ${(props) => props.theme.colors[props.target.color]};
    `;
  }}
`;

export default Bubble;
