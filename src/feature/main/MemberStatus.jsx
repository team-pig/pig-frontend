import React, { useState } from "react";
import styled, { css } from "styled-components";
import ReactTooltip from "react-tooltip";

// component & elem
import flex from "../../themes/flex";
import Graph from "./Graph";
import Tags from "./Tags";
import { Text } from "../../elem";
import { body_3, body_4 } from "../../themes/textStyle";
import Icon from "../../components/Icon";

const MemberStatus = ({ member, graphColor }) => {
  const [viewTag, setViewTag] = useState(false);
  const { checked, nickname, notChecked, desc, tags, avatar, color } = member;
  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  return (
    <Container>
      <MemberMain>
        <Avatar avatar={avatar} color={color} data-tip data-for={nickname}>
          {nickname && avatar === "" && nickname[0]}
        </Avatar>
        <ReactTooltip
          id={nickname}
          place="top"
          type="light"
          backgroundColor="var(--white)"
          borderColor="var(--line)"
          border={true}
        >
          <span>{nickname}</span>
        </ReactTooltip>
        <GraphBox>
          <Graph color={graphColor} height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Message>
        <Desc type="body_4" color="darkgrey">
          {desc === null ? "상태 메시지가 없습니다." : desc}
        </Desc>
      </Message>
      <MemberInfo>
        <div
          onClick={() => {
            setViewTag((pre) => !pre);
          }}
        >
          {viewTag ? (
            <ViewTag>
              <>태그 접기</>
              <Icon icon="arrow-down" size="14px" color="var(--grey)" />
            </ViewTag>
          ) : (
            <ViewTag>
              <>태그 보기</>
              <Icon icon="arrow-down" size="14px" color="var(--grey)" />
            </ViewTag>
          )}
        </div>
        {viewTag && (
          <>
            <Tags tag={tags} />
          </>
        )}
        <StatusNums>
          <VerticalLine />
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checked} / {checked + notChecked})
          </Text>
        </StatusNums>
      </MemberInfo>
    </Container>
  );
};
const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: var(--grey);
`;
const ViewTag = styled.div`
  ${flex("end", "center")}
  cursor: pointer;
  gap: 5px;
  margin-bottom: 10px;
`;
const Avatar = styled.div`
  ${flex()}
  ${body_3}
  flex-shrink: 0;
  color: var(--white);
  width: 38px;
  height: 38px;
  border-radius: 50%;

  ${(props) =>
    props.avatar !== ""
      ? css`
          background-image: url(${props.avatar});
          background-size: cover;
          background-position: center center;
        `
      : css`
          background-color: ${(props) => props.theme.colors[props.color]};
        `};
`;

const Container = styled.article`
  border-bottom: 1px solid var(--line);
  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

const MemberMain = styled.div`
  ${flex("start")};
  margin-top: 23px;
  margin-bottom: 15px;
`;

const GraphBox = styled.div`
  width: 200px;
  margin-left: 23px;

  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    max-width: 300px;
  }
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
`;
const MemberInfo = styled.div`
  ${body_4};
  color: var(--darkgrey);
  margin-bottom: 25px;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  margin-top: 10px;
  gap: 13px;
  height: 30px;
`;

const Message = styled.div`
  ${flex("between", "center")}
  margin-bottom: 10px;
`;

export default React.memo(MemberStatus);
