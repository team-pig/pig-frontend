import React from "react";
import styled from "styled-components";

import flex from "../../themes/flex";
import { regex } from "../../shared/regex";
import { body_4 } from "../../themes/textStyle";

const Tags = ({ tag, gap, textType }) => {
  const filterTag =
    typeof tag === "string"
      ? tag.split(regex.commaAndTrim).filter(Boolean)
      : tag;

  return (
    <TagBox gap={gap}>
      {filterTag &&
        filterTag.map((tag, idx) => {
          return <Tag key={idx}>{tag}</Tag>;
        })}
    </TagBox>
  );
};

const TagBox = styled.div`
  ${flex("start")};
  gap: ${(props) => (props.gap ? `${props.gap}px;` : "5px;")};
  flex-wrap: wrap;
  cursor: pointer;
`;

const Tag = styled.div`
  ${body_4}
  color: var(--darkgrey);
  padding: 4px 10px 3px 10px;
  border: 1px solid var(--grey);
  border-radius: 4px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default Tags;
