import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";
import { useSelector } from "react-redux";

const FeatFifth = () => {
  const isMobile = useSelector((state) => state.resize.isMobile);

  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>프로젝트 현황을 한눈에</Title>
          <Sub>다양한 태그로 나를 표현하세요</Sub>
        </Infos>
        <MainImage
          src={!isMobile ? "/img/_feat_5.svg" : "/img/_feat_m_5.svg"}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(241, 237, 254, 1) 79%,
    rgba(231, 225, 253, 1) 100%
  );
`;

const Wrapper = styled.div`
  ${flex("center", "start")}
  flex-wrap: wrap;
  max-width: 1440px;
  gap: 32px;
  height: 100%;
  margin: 0 auto;
  padding: 200px 80px 80px 80px;

  ${({ theme }) => theme.device.mobile} {
    padding: 100px 20px 20px 20px;
  }
`;

const Infos = styled.div``;

const MainImage = styled.img``;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;

  ${({ theme }) => theme.device.mobile} {
    ${head_6}
    margin-bottom: 30px;
  }
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  color: var(--darkgrey);

  ${({ theme }) => theme.device.mobile} {
    font-size: 1.6rem;
  }
`;

export default FeatFifth;
