import React, { useEffect, useState } from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

// redux
import { dashBoardApi } from "../../api/dashBoardApi";
import { useParams } from "react-router-dom";

const StatusSection = ({ myTodoLength }) => {
  const [loading, setLoading] = useState(true);
  const [editedInfo, setEditedInfo] = useState([]);
  const [myNewInfo, setMyNewInfo] = useState({});
  const [projectStatus, setProjectStatus] = useState({});

  const { roomId } = useParams();
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const {
          data: { memberStatus, projectStatus },
        } = await dashBoardApi.loadAllStatus(roomId);
        const myIndx = memberStatus.findIndex(
          (member) => member.userId === myId
        );

        setEditedInfo(memberStatus);
        setMyNewInfo(memberStatus[myIndx]);
        setProjectStatus(projectStatus);
      } catch (e) {
        console.log(`에러 발생 : ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberInfo();
    return () => setLoading(false);
  }, [myTodoLength]);

  if (loading) return <></>;
  return (
    <Container>
      <ProjectStatus projectStatus={projectStatus} />
      <Members
        myTodoLength={myTodoLength}
        editedInfo={editedInfo}
        setEditedInfo={setEditedInfo}
        myNewInfo={myNewInfo}
        setMyNewInfo={setMyNewInfo}
        myId={myId}
      />
    </Container>
  );
};

const Container = styled.div`
  --header: 48px;
  --minusHeight: calc(var(--header));

  width: 425px;
  height: calc(100vh - var(--minusHeight));
  border-right: 1px solid var(--line);
`;

export default StatusSection;
