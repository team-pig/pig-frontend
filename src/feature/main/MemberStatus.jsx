import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

// component & elem
import flex from "../../themes/flex";
import Graph from "./Graph";
// import Tags from "./Tags";
import { IconBtn, Text } from "../../elem";
import { useSelector, useDispatch } from "react-redux";
import { __editMyProfile } from "../../redux/modules/dashBoard";
import { useParams } from "react-router-dom";

const MemberStatus = ({ member, color }) => {
  const dispatch = useDispatch();
  const { checked, nickname, notChecked, userId, desc, tags } = member;
  const myId = useSelector((state) => state.user.user.userId);
  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  const isMe = myId === userId;
  const { roomId } = useParams();

  return (
    <Member>
      <MemberMain>
        <Name type="head_7" color="black">
          {nickname}
        </Name>
        {isMe ? <Setting icon="setting" size="24px" color="#757575" /> : ""}
        <GraphBox>
          <Graph color={color} height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Desc type="body_4" color="darkgrey">
        {desc === null ? "상태 메시지가 없습니다." : desc}
      </Desc>
      <MemberInfo>
        <Tags tags={tags} />
        <Line />
        <StatusNums>
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checked} / {checked + notChecked})
          </Text>
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
  /* flex-shrink: 0; */
  width: 130px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
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
  width: 240px;
  margin-left: 50px;
  flex-shrink: 0;
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

const Tags = styled.div``;

export default MemberStatus;
