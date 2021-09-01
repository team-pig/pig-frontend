import React from "react";
import styled from "styled-components";

import Icon from "../components/Icon";
import IconBtn from "../elem/IconBtn";
import Information from "../feature/main/Information";
import flex from "../themes/flex";

const InformationM = () => {
  return (
    <Container>
      <Information detailpage={true} />
    </Container>
  );
};

const Container = styled.div`
  ${flex("start", "start", false)}
  width: 100%;
`;

export default InformationM;
