import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
import IconBtn from "../../elem/IconBtn";

// 더 보기 아이콘, 클릭하면 드롭다운이 보인다
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
