import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Icon from "../../components/Icon";

// api
import { __deleteDoc } from "../../redux/modules/document";
import flex from "../../themes/flex";

const DocListItem = memo(({ doc, isCurrentDoc }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();

  const showDocDetail = (docId) =>
    history.push(`/workspace/${roomId}/doc/${docId}`);

  const clickDelete = (title) => {
    if (!window.confirm(`정말 ${title}을 삭제하시겠습니까?`)) return;
    dispatch(__deleteDoc(docId, roomId));
  };

  return (
    <>
      <Item
        onClick={() => showDocDetail(doc.docId)}
        isCurrentDoc={isCurrentDoc}
      >
        {isCurrentDoc ? (
          <IconBox onClick={() => clickDelete(doc.title)}>
            <Icon icon="remove" size="14px" color="var(--darkgrey)" />
          </IconBox>
        ) : (
          <IconBox>
            <Icon icon="document1" size="20px" />
          </IconBox>
        )}
        <Name isCurrentDoc={isCurrentDoc}>{doc.title}</Name>
      </Item>
    </>
  );
});

const Item = styled.li`
  ${flex("start", "center")};
  height: 42px;
  padding: 10px 20px;
  transition: color 100ms ease-in-out;
  cursor: pointer;
  ${(props) =>
    props.isCurrentDoc &&
    `background-color: var(--line);
    font-weight: 600;
    
    ${Name} {
      color: var(--black);
    }
    `}
`;

const IconBox = styled.div`
  ${flex()};
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
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
`;

export default DocListItem;
