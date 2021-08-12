import React from "react";
import styled from "styled-components";

// component & elem
import ProjectStatus from "./ProjectStatus";
import Members from "./Members";

const StatusSection = () => {
  //가짜 데이터
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

  return (
    <Container>
      <ProjectStatus project={project} />
      <Members members={members} />
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
