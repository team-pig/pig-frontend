import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";

const BookMark = ({ isMarked }) => {
  return (
    <>

      {isMarked ? <Icon icon="star-filled" size="24px" />
      :
      <Star />}
    </>
  );
};


export default BookMark;
