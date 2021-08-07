import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

import { Text } from "../../elem";
import flex from "../../themes/flex";
import Graph from "./Graph";
import Tags from "./Tags";

const MemberStatus = ({ member, color }) => {
  const memberPercent = Math.floor(
    (member.completedTodos / member.totalTodos) * 100
  );

  return (
    <Member>
      <MemberMain>
        <Name type="head_7" color="black">
          {member.nickname}
        </Name>
        <Setting icon="setting" size="20px" color="#757575" />
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
        <Text type="body_2" color="darkgrey">{`${Math.floor(
          (member.completedTodos / member.totalTodos) * 100
        )}% 완료`}</Text>
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
  flex-shrink: 0;
  margin-right: 8px;
`;

const Setting = styled(Icon)`
  margin-right: 24px;
`;

const GraphBox = styled.div`
  width: 250px;
`;

const Desc = styled(Text)`
  margin-bottom: 12px;
`;

const MemberInfo = styled.div`
  ${flex("start")};
  margin-bottom: 25px;
`;

const Line = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 15px;
  background-color: var(--grey);
`;

export default MemberStatus;
