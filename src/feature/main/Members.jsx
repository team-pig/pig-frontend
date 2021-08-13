import React from "react";
import styled from "styled-components";

// component & elem
import MemberStatus from "./MemberStatus";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { scrollbar } from "../../themes/scrollbar";
import { Text, IconBtn } from "../../elem";

const Members = ({ memberStatus }) => {
  const colorAry = ["blue", "mint", "yellow", "orange"];

  return (
    <Container>
      <MembersHeader>
        <Text type="body_1">팀원 현황</Text>
        {/* <IconBtn _onClick={() => {}}>
          <Icon icon="plus-lg" color="#757575" />
        </IconBtn> */}
      </MembersHeader>
      {memberStatus.map((member, idx) => (
        <MemberStatus
          key={member.userId}
          member={member}
          color={colorAry[idx % 4]}
        />
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
  ${flex("between", "center")}
  margin-bottom: 30px;
`;

export default Members;
