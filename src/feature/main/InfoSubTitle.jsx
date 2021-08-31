import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { sub_1, body_4 } from "../../themes/textStyle";
import { Textarea, Text } from "../../elem";

const InfoSubTitle = ({ editMode, editedInfo, handleChange }) => {
  const room = useSelector((state) => state.room.roomInfos);
  const { subtitle } = room;

  if (editMode) {
    return (
      <Textarea
        maxLength={500}
        value={editedInfo.subtitle}
        minHeight={20}
        mobileText="body_3"
        _onChange={(e) => handleChange("subtitle", e.target.value)}
      />
    );
  }

  return <>{subtitle && <SubTitle>{subtitle}</SubTitle>}</>;
};

const SubTitle = styled(Text)`
  ${sub_1}
  color: var(--darkgrey);
  min-height: 40px;
  word-break: break-all;

  ${({ theme }) => theme.device.mobile} {
    ${body_4}
    min-height: 18px;
    margin-bottom: 10px;
  }
`;

export default InfoSubTitle;
