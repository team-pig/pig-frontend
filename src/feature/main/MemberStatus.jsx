import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

// component & elem
import flex from "../../themes/flex";
import Graph from "./Graph";
import Tags from "./Tags";
import { IconBtn, Text } from "../../elem";

const MemberStatus = ({ member, color }) => {
  //가짜 데이터
  const user = {
    userId: "dsfk231",
    nickname: "유리",
  };

  const memberPercent = Math.floor(
    (member.completedTodos / member.totalTodos) * 100
  );

  const isMe = member.userId === user.userId;
  console.log(isMe);

  return (
    <Member>
      <MemberMain>
        <Name type="head_7" color="black">
          {member.nickname}
          {isMe === true && (
            <Btn>
              <Setting icon="setting" size="20px" color="#757575" />
            </Btn>
          )}
        </Name>
        <GraphBox>
          <Graph color={color} height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Desc type="body_4" color="darkgrey">
        {member.desc}
      </Desc>
      <MemberInfo>
        <Tags tags={member.tags} />
        <Line />
        <StatusNums>
          <Text type="body_2" color="darkgrey">{`${Math.floor(
            (member.completedTodos / member.totalTodos) * 100
          )}% 완료`}</Text>
          <Text
            type="body_4"
            color="grey"
          >{`(${member.completedTodos}/${member.totalTodos})`}</Text>
        </StatusNums>
      </MemberInfo>
    </Member>
  );
};

const Member = styled.article`
  border-bottom: 1px solid var(--line);
`;

const MemberMain = styled.div`
  ${flex("start")};
  margin-top: 23px;
  margin-bottom: 15px;
`;

const Name = styled(Text)`
  position: relative;
  flex-shrink: 0;
  margin-right: 8px;
`;

const Btn = styled(IconBtn)`
  position: absolute;
  top: 50%;
  right: -18px;
  transform: translate(50%, -50%);
`;

const Setting = styled(Icon)``;

const GraphBox = styled.div`
  width: 250px;
  margin-left: 50px;
`;

const Desc = styled(Text)`
  margin-bottom: 12px;
`;
const MemberInfo = styled.div`
  ${flex("start")};
  margin-bottom: 25px;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  gap: 13px;
`;

const Line = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 15px;
  background-color: var(--grey);
`;
export default MemberStatus;
