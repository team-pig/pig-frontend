import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";

import IconBtn from "../../elem/IconBtn";

const BookMark = ({ isMarked, clickBookmark }) => {
  return (
    <Box>
      <IconBtn padding="0px" _onClick={clickBookmark}>
        {isMarked ? <Icon icon="star-filled" size="24px" /> : <Star />}
      </IconBtn>
    </Box>
  );
};
const Box = styled.div`
  z-index: 28;
`;

export default BookMark;
