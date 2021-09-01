import React from "react";
import styled from "styled-components";

// component & elem
import MyStatus from "./MyStatus";
import MemberStatus from "./MemberStatus";
import { scrollbar } from "../../themes/scrollbar";
import flex from "../../themes/flex";
import { useSelector } from "react-redux";
import { body_1 } from "../../themes/textStyle";
import { mobileHidden } from "../../themes/responsive";

const Members = () => {
  const memberStatus = useSelector((state) => state.todos.memberStatus);
  const colorAry = ["yellow", "orange", "mint", "blue"];

  return (
    <Container>
      <MembersHeader>팀원 현황</MembersHeader>
      <StatusContent>
        <MyStatus />
        {memberStatus &&
          memberStatus.map((member, idx) => (
            <MemberStatus
              key={member.userId}
              member={member}
              graphColor={colorAry[idx % 4]}
            />
          ))}
      </StatusContent>
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;
  --project: 160px;
  --minusHeight: calc(var(--header) + var(--project));

  ${mobileHidden}
  ${scrollbar};
  height: calc(100vh - var(--minusHeight));
  padding: 18px 20px;
  overflow-y: auto;
`;

const StatusContent = styled.div`
  width: 100%;
`;

const MembersHeader = styled.div`
  ${flex("between", "center")};
  ${body_1};
  margin-bottom: 30px;
`;

export default Members;
