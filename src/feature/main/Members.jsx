import React from "react";
import styled from "styled-components";

// component & elem
import MyStatus from "./MyStatus";
import MemberStatus from "./MemberStatus";
import { scrollbar } from "../../themes/scrollbar";
import flex from "../../themes/flex";
import { useSelector } from "react-redux";
import { body_1 } from "../../themes/textStyle";

const Members = () => {
  const memberStatus = useSelector((state) => state.todos.memberStatus);

  return (
    <Container>
      <MembersHeader>팀원 현황</MembersHeader>
      <MyStatus />
      {memberStatus &&
        memberStatus.map((member) => (
          <MemberStatus key={member.userId} member={member} />
        ))}
    </Container>
  );
};

const Container = styled.section`
  --header: 48px;
  --project: 160px;
  --minusHeight: calc(var(--header) + var(--project));

  ${scrollbar};
  height: calc(100vh - var(--minusHeight));
  padding: 18px 20px;
  overflow-y: auto;
`;

const MembersHeader = styled.div`
  ${flex("between", "center")};
  ${body_1};
  margin-bottom: 30px;
`;

export default Members;
