import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Icon from "../../components/Icon";

// api
import { __deleteDoc } from "../../redux/modules/document";
import flex from "../../themes/flex";

const DocListItem = memo(({ doc }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();

  const showDocDetail = (docId) =>
    history.push(`/workspace/${roomId}/doc/${docId}`);

  const clickDelete = () => {
    // 정말 삭제할거냐는 안내 모달 필요
    dispatch(__deleteDoc(docId, roomId));
  };

  return (
    <>
      <Item onClick={() => showDocDetail(doc.docId)}>
        <IconBox>
          <Icon icon="document" size="20px" />
        </IconBox>
        <Name>{doc.title}</Name>
        <IconBtn onClick={clickDelete}>
          <RemoveIcon icon="remove" size="20px" />
        </IconBtn>
      </Item>
    </>
  );
});

const RemoveIcon = styled(Icon)`
  color: var(--darkgrey);
  transition: color 230ms ease-in-out;
`;

const IconBtn = styled.button`
  display: none;

  &:hover {
    ${flex()}
    height: 100%;
    padding: 10px 20px;
    margin-left: 10px;

    ${RemoveIcon} {
      color: var(--notice);
    }
  }
`;

const Item = styled.li`
  ${flex("start", "center")};
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
