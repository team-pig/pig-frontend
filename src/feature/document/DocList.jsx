import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

// elem
import Icon from "../../components/Icon";
import DocListItem from "./DocListItem";
import { scrollbar } from "../../themes/scrollbar";
import { Text } from "../../elem";
import flex from "../../themes/flex";

const DocList = ({ docList }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const toDocAdd = () => history.push(`/workspace/${roomId}/doc/add`);

  return (
    <Container>
      <TitleBox>
        {/* 문서 목록은 나중에 검색으로 이용할 예정. inputToggle 사용 가능 */}
        <Text type="body_1">문서 목록</Text>
        <PlusBtn onClick={toDocAdd} className="doc-add-btn">
          <Icon icon="plus-lg" size="24px" color="var(--darkgrey)" />
        </PlusBtn>
      </TitleBox>
      <List className="doc-list">
        {docList.map((doc) => (
          <DocListItem
            key={doc.docId}
            doc={doc}
            isCurrentDoc={docId === doc.docId ? true : false}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.aside`
  width: 100%;
  max-height: 100%;
  border-right: 1px solid var(--line);
  background-color: var(--white);
`;

const TitleBox = styled.div`
  ${flex("between")}
  width: 100%;
  height: 60px;
  padding: 0 var(--smMargin);
  color: var(--grey);
`;

const PlusBtn = styled.button`
  color: var(--grey);
`;

const List = styled.ul`
  --WSHeaderHeight: 48px;
  --listTitleHeight: 60px;
  ${scrollbar}
  height: calc(100vh - var(--WSHeaderHeight) - var(--listTitleHeight));
  overflow-y: auto;
`;

export default DocList;
