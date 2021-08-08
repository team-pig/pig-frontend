import React from "react";
import styled from "styled-components";

import Icon from "../Icon";
import { IconBtn } from "../../elem";
import flex from "../../themes/flex";

const RoomMember = () => {
  return (
    <Container>
      <div>멤버들 얼굴 컴포넌트</div>
      <IconBtn>
        <Icon icon="search" size="24px" color="var(--grey)" />
      </IconBtn>
    </Container>
  );
};

const Container = styled.div`
  ${flex("between", "center")};
  width: 100%;
  height: 48px;
  padding: 0 10px 0 20px;
`;

export default RoomMember;
