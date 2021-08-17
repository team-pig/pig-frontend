import React from "react";
import styled from "styled-components";

// component & elem
import flex from "../../themes/flex";
import Graph from "./Graph";
import Tags from "./Tags";
import { Text } from "../../elem";
import { body_4 } from "../../themes/textStyle";

const MemberStatus = ({ member, color }) => {
  const { checked, nickname, notChecked, desc, tags } = member;
  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  return (
    <Container>
      <MemberMain>
        <Name type="head_7" color="black">
          {nickname}
        </Name>
        <GraphBox>
          <Graph color="mint" height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Message>
        <Desc type="body_4" color="darkgrey">
          {desc === null ? "상태 메시지가 없습니다." : desc}
        </Desc>
        <StatusNums>
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checked} / {checked + notChecked})
          </Text>
        </StatusNums>
      </Message>
      <MemberInfo>
        <Tags tag={tags} />
      </MemberInfo>
    </Container>
  );
};

const Container = styled.article`
  border-bottom: 1px solid var(--line);
`;

const MemberMain = styled.div`
  ${flex("start")};
  margin-top: 23px;
  margin-bottom: 15px;
`;

const Name = styled(Text)`
  position: relative;
  width: 130px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-right: 8px;
`;

const GraphBox = styled.div`
  width: 220px;
  margin-left: 50px;
  flex-shrink: 0;
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
`;
const MemberInfo = styled.div`
  ${flex("start")};
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  gap: 13px;
  height: 30px;
`;

const Message = styled.div`
  ${flex("between", "center")}
  margin-bottom: 10px;
`;

export default MemberStatus;
