import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import Icon from "../../components/Icon";

const DocListItem = ({ doc }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const showDocDetail = (docId) =>
    history.push(`/workspace/${roomId}/doc/${docId}`);

  return (
    <>
      <Item onClick={() => showDocDetail(doc.docId)}>
        <IconBox>
          <Icon icon="document" size="20px" />
        </IconBox>
        <Name>{doc.title}</Name>
        <IconBtn>
          <RemoveIcon icon="remove" size="20px" />
        </IconBtn>
      </Item>
    </>
  );
};

const RemoveIcon = styled(Icon)`
  color: var(--darkgrey);
  transition: color 230ms ease-in-out;
`;

const IconBtn = styled.button`
  display: none;
  height: 100%;
  padding: 10px 20px;
  margin-right: -20px;

  &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    ${RemoveIcon} {
      color: var(--notice);
    }
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 42px;
  padding: 10px 20px;
  transition: color 100ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: var(--black);
    background-color: var(--line);
    font-weight: 600;

    ${IconBtn} {
      display: contents;
    }
  }
`;

const IconBox = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
`;

const Name = styled.p`
  width: 100%;
  margin-left: 10px;
  color: var(--darkgrey);
  font-size: 1.6rem;
  line-height: 2.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
`;

export default DocListItem;
