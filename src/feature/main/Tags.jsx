import React from "react";
import styled from "styled-components";

import { Text } from "../../elem";
import flex from "../../themes/flex";

const Tags = ({ tags }) => {
  return (
    <TagBox>
      {tags.map((tag, idx) => (
        <Tag>
          <Text type="body_4" color="darkgrey">
            {tag}
          </Text>
        </Tag>
      ))}
    </TagBox>
  );
};

const TagBox = styled.div`
  ${flex("start")};
  gap: 5px;
`;

const Tag = styled.div`
  padding: 5px 10px;
  border: 1px solid var(--grey);
  border-radius: 4px;
`;

export default Tags;
