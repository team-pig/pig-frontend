import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";

import IconBtn from "../../elem/IconBtn";

// 즐겨찾기 아이콘
// isMarded 기준으로 즐겨찾기 되고 안되고를 표시함
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
