import React from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { head_2, head_6 } from "../../themes/textStyle";

const FeatFirst = () => {
  return (
    <Container>
      <Wrapper>
        <Infos>
          <Title>프로젝트별로 방을 만들어요</Title>
          <Sub>초대코드를 이용해서 팀원을 초대하세요!</Sub>
          <Sub>단 하나의 방에서 프로젝트의 모든 것을 공유할 수 있어요.</Sub>
          <Image src="/img/feat_1.svg" />
        </Infos>
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
  ${flex("start", "start")}
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 100px 80px 80px 80px;
  overflow: hidden;
`;

const Infos = styled.div``;

const Image = styled.img``;

const Title = styled.h1`
  ${head_2}
  margin-bottom: 40px;
`;

const Sub = styled.h2`
  ${head_6}
  margin-bottom: 10px;
  color: var(--darkgrey);
`;

export default FeatFirst;
