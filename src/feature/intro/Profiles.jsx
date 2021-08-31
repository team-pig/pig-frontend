import React from "react";
import styled from "styled-components";
import { head_7 } from "../../themes/textStyle";
import Profile from "./Profile";

const Profiles = () => {
  const teamPig = [
    {
      name: "이현수",
      role: "팀장, 백엔드",
      tags: "#INTJ #철학 #동물",
      desc: "The man who says he can and the man who says he cannot ... are both correct.",
      avatar: "/img/hyun.svg",
    },
    {
      name: "김동현",
      role: "백엔드",
      tags: "#ESFP #야구 #영화 #스노우보드 #고양이",
      desc: "풍파는 언제나 전진하는 자의 벗이다.",
      avatar: "/img/dong.svg",
    },
    {
      name: "명재국",
      role: "백엔드",
      tags: "#INTP #사진 #게임 #인라인 #피아노 #개미 #낭만 #자전거 #상황극",
      desc: "나는 내게 일어난 일들이 아닌, 내가 되기로 한 사람입니다.",
      avatar: "/img/jae.svg",
    },
    {
      name: "예상기",
      role: "프론트엔드",
      tags: "#INFP #취미로개발",
      desc: "개발은 게임입니다",
      avatar: "/img/sang.svg",
    },
    {
      name: "안지현",
      role: "프론트엔드",
      tags: "#ISTP",
      desc: "若汝不狂 終不及之",
      avatar: "/img/ji.svg",
    },
    {
      name: "김아영",
      role: "프론트엔드",
      tags: "#ENFP #INFP #한성키보드 #인테리어 #웹툰 #좌상기우지현 #개발은 장비빨 #스쿼시",
      desc: "야! 이게 뭐라고! 할 수 있다!",
      avatar: "/img/young.svg",
    },
    {
      name: "안나",
      role: "디자이너",
      tags: "#ENFP #고양이",
      desc: "",
      avatar: "/img/ah.svg",
    },
    {
      name: "정서윤",
      role: "디자이너",
      tags: "#INFP #디자인 #게임",
      desc: "Without persistence, what remains is an enthusiasm of the moment.",
      avatar: "/img/ah.svg",
    },
  ];
  return (
    <Container>
      <Title>TeamPig Members</Title>
      <Grid>
        {teamPig.map((member, idx) => (
          <Profile member={member} key={idx} />
        ))}
      </Grid>
    </Container>
  );
};
const Container = styled.section`
  max-width: 1440px;
  margin: 0 auto 100px auto;
`;

const Grid = styled.article`
  width: 100%;
  padding: 0 80px;
  row-gap: 40px;
  column-gap: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${({ theme }) => theme.device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 20px;
  }

  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 20px;
    padding: 0 20px;
  }
`;
const Title = styled.h1`
  ${head_7}
  padding: 0 80px;
  margin-bottom: 58px;

  ${({ theme }) => theme.device.mobile} {
    padding: 0 20px;
  }
`;
export default Profiles;
