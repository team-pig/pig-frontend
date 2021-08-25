import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";

const FeatThird = () => {
  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>별도의 메신저 필요없이</Title>
          <Sub>방마다 제공되는 채팅으로 소통을 편리하게</Sub>
        </Infos>
        <MainImage src="/img/feat_3_1.svg" />
        <SubImage src="/img/feat_3_2.svg" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 873px;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  ${flex()}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 80px;
  position: relative;
  overflow: hidden;
`;

const Infos = styled.div`
  z-index: 1;
`;

const MainImage = styled.img`
  position: absolute;
  left: 100px;
  bottom: -140px;
`;
const SubImage = styled.img`
  position: absolute;
  right: 100px;
  bottom: 0px;
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

export default FeatThird;
