import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Tags from "./Tags";

import { body_3, sub_2 } from "../../themes/textStyle";

const InfoTags = ({ editMode, editedInfo, handleChange }) => {
  const room = useSelector((state) => state.room.roomInfos);
  const { tag } = room;

  if (editMode) {
    return (
      <TagContainer>
        <TagsInput
          maxLength="100"
          type="text"
          placeholder="태그는 ','으로 구분하여 입력해주세요. (전체 100자 이하)"
          value={editedInfo.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
        />
      </TagContainer>
    );
  }

  return (
    <TagContainer>
      <Tags tag={tag} gap="10" textType="sub_2" color="dargrey" />
    </TagContainer>
  );
};

const TagContainer = styled.div`
  min-height: 30px;
  margin-bottom: 20px;

  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 10px;
  }
`;

const TagsInput = styled.input`
  ${sub_2};
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.device.mobile} {
    ${body_3};
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default InfoTags;
