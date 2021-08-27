import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
import IconBtn from "../../elem/IconBtn";

const More = ({ dropDownModal }) => {
  return (
    <Box>
      <IconBtn padding="0px" _onClick={dropDownModal}>
        <Icon icon="more" size="24px" />
      </IconBtn>
    </Box>
  );
};

const Box = styled.div`
  z-index: 28;
`;
export default More;
