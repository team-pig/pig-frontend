import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";

const FeatFourth = () => {
  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>바로 쓰세요, 바로 공유하세요</Title>
          <Sub>공유를 위해 파일을 주고 받을 필요가 없어요</Sub>
        </Infos>
        <SubGround>
          <MainImage src="/img/feat_4.svg" />
        </SubGround>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;
`;

const Wrapper = styled.div`
  ${flex("between", "center", false)}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 200px 80px 0 80px;
`;

const Infos = styled.div``;

const SubGround = styled.div`
  width: 100%;
  height: 455px;
  background-color: #fff4d0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

const MainImage = styled.img`
  position: absolute;
  left: 50%;
  bottom: -140px;
  transform: translate(-50%);
`;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;
  text-align: center;
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  text-align: center;
  color: var(--darkgrey);
`;

export default FeatFourth;
