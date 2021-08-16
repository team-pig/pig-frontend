import React, { useState, useEffect } from "react";
import styled from "styled-components";

// component & elem
import MyStatus from "./MyStatus";
import MemberStatus from "./MemberStatus";
import { scrollbar } from "../../themes/scrollbar";
import { Text } from "../../elem";
import { useParams } from "react-router-dom";
import flex from "../../themes/flex";

// redux & api
import { dashBoardApi } from "../../api/dashBoardApi";
import { useSelector } from "react-redux";

const Members = ({ memberStatus }) => {
  const colorAry = ["blue", "mint", "yellow", "orange"];
  const myId = useSelector((state) => state.user.user.userId);
  const [editedInfo, setEditedInfo] = useState([]);
  const [myNewInfo, setMyNewInfo] = useState({});
  const { roomId } = useParams();

  useEffect(() => {
    try {
      const fetchMemberInfo = async () => {
        const {
          data: { memberStatus },
        } = await dashBoardApi.loadAllStatus(roomId);
        const myIndx = memberStatus.findIndex(
          (member) => member.userId === myId
        );

        setEditedInfo(memberStatus);
        setMyNewInfo(memberStatus[myIndx]);
      };

      fetchMemberInfo();
    } catch (e) {
      console.log(`에러 발생 : ${e}`);
    }
  }, []);

  if (editedInfo.length === 0 || Object.keys(myNewInfo).length === 0)
    return <></>;

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
