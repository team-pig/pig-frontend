import React from "react";
import styled from "styled-components";

// component
import Icon from "./Icon";

// elem
import { Text } from "../elem";
import flex from "../themes/flex";

const HelpBtns = () => {
  return (
    <Container>
      <LeftSide>
        <Icon icon="checkbox" size="20px" />
        <Text type="body_3">아이디 저장</Text>
      </LeftSide>
      <RightSide>
        <Text type="body_3">아이디 찾기</Text>
        <Text type="body_3">비밀번호 찾기</Text>
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  ${flex("between")}
`;

const LeftSide = styled.div`
  ${flex("start")}
  gap: 6px;
`;

const RightSide = styled.div`
  ${flex("start")}

  & > div:last-child::before {
    content: "";
    height: 100%;
    padding-left: 1px;
    margin: 0 8px;
    background-color: var(--line);
  }
`;

export default HelpBtns;
