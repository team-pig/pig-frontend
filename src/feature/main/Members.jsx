import React from "react";
import styled from "styled-components";

// component & elem
import MyStatus from "./MyStatus";
import MemberStatus from "./MemberStatus";
import { scrollbar } from "../../themes/scrollbar";
import { Text } from "../../elem";
import flex from "../../themes/flex";

const Members = ({ editedInfo, myNewInfo, setMyNewInfo, myId }) => {
  const colorAry = ["blue", "mint", "yellow", "orange"];

  return (
    <Container>
      <MembersHeader>
        <Text type="body_1">팀원 현황</Text>
      </MembersHeader>
      <MyStatus myNewInfo={myNewInfo} setMyNewInfo={setMyNewInfo} />
      {editedInfo.map(
        (member, idx) =>
          member.userId !== myId && (
            <MemberStatus
              key={member.userId}
              member={member}
              color={colorAry[idx % 4]}
            />
          )
      )}
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
