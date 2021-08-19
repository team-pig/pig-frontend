import React, { useEffect } from "react";
import styled from "styled-components";

// component & elem
import MyStatus from "./MyStatus";
import MemberStatus from "./MemberStatus";
import { scrollbar } from "../../themes/scrollbar";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import { useSelector } from "react-redux";
import { useState } from "react";

const Members = () => {
  const [memberStatus, setMemberStatus] = useState([]);
  const [myInfo, setMyInfo] = useState({});

  const __memberStatus = useSelector((state) => state.dashBoard.memberStatus);
  const __id = useSelector((state) => state.user.user.userId);

  useEffect(() => {
    setMemberStatus(__memberStatus);
    const myIndx = __memberStatus.findIndex((member) => member.userId === __id);
    setMyInfo(__memberStatus[myIndx]);
  }, [__memberStatus, __id]);

  return (
    <Container>
      <MembersHeader>
        <Text type="body_1">팀원 현황</Text>
      </MembersHeader>
      {myInfo && <MyStatus myInfo={myInfo} setMyInfo={setMyInfo} />}
      {memberStatus &&
        memberStatus.map((member, idx) => {
          return (
            member.userId !== __id && (
              <MemberStatus key={member.userId} member={member} />
            )
          );
        })}
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
