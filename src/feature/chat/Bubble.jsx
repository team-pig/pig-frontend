import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";

// elem & style
import Avatar from "../../elem/Avatar";
import flex from "../../themes/flex";
import { body_4 } from "../../themes/textStyle";
import { Text } from "../../elem";

const Bubble = ({ message, type }) => {
  const members = useSelector((state) => state.members.members);

  const getTime = (submitTime) => {
    const convertTime = moment.utc(submitTime).toDate();
    const targetTime = moment(convertTime).format("YYYY.MM.DD.ddd/a h:mm");
    const timeAry = targetTime.split("/")[1].split(" ");
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
          <Avatar target={target} size={30} />
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
  max-width: 100%;
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
  max-width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  white-space: pre-wrap;
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

export default Bubble;
