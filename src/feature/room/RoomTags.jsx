import React from "react";
import styled from "styled-components";

import { Text } from "../../elem/index";

const RoomTags = ({ tag }) => {
  return (
    <Text type="body_2">
      {tag.map((item, idx) => {
        return <Tag key={idx}>#{item}</Tag>;
      })}
    </Text>
  );
};

const Tag = styled.span`
  margin-right: 2px;
  /* 밑 글자 잘림 해결 */
  line-height: normal;
  white-space: nowrap;
  word-break: keep-all;
`;

export default RoomTags;
