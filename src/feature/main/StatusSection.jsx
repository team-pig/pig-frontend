import React from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

// component & elem
import MemberStatus from "./MemberStatus";
import ProjectStatus from "./ProjectStatus";
import { Text } from "../../elem";
import flex from "../../themes/flex";

const StatusSection = () => {
  //가짜 데이터
  const user = {
    userId: "dsfk231",
    nickname: "유리",
  };

  const project = {
    totalTodos: 120,
    completedTodos: 99,
  };

  const members = [
    {
      userId: "dsfk231",
      nickname: "유리",
      desc: "MBTI안해요. 물어보지마세요.",
      tags: ["자료검색", "침묵의네이버"],
      totalTodos: 20,
      completedTodos: 10,
    },
    {
      userId: "dsf23dsfk",
      nickname: "짱구",
      desc: "상태메세지가 들어갑니다.",
      tags: ["조장", "광대담당", "INFP"],
      totalTodos: 20,
      completedTodos: 1,
    },
    {
      userId: "kj123sdf",
      nickname: "훈이",
      desc: "상태메세지가 들어갑니다.",
      tags: ["발표", "물음표살인마", "ENFP"],
      totalTodos: 30,
      completedTodos: 15,
    },
    {
      userId: "po2kjf3",
      nickname: "철수",
      desc: "상태메세지가 들어갑니다.",
      tags: ["자료검색", "말안해요"],
      totalTodos: 50,
      completedTodos: 49,
    },
  ];

  const colorAry = ["blue", "mint", "yellow", "orange"];

  return (
    <Container>
      <ProjectStatus project={project} />
      <Members>
        <MembersHeader>
          <Text type="body_1">팀원 현황</Text>
          <IconBtn>
            <Icon icon="plus-lg" color="#757575" />
          </IconBtn>
        </MembersHeader>
        {members.map((member, idx) => (
          <MemberStatus key={idx} member={member} color={colorAry[idx % 4]} />
        ))}
      </Members>
    </Container>
  );
};

const Container = styled.div`
  width: 425px;
  height: 100%;
  border-right: 1px solid var(--line);
`;

const Members = styled.section`
  padding: 18px 20px;
`;

const MembersHeader = styled.div`
  ${flex("between", "center")}
  margin-bottom: 30px;
`;

const IconBtn = styled.button``;

export default StatusSection;
