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
        <PlusBtn onClick={toDocAdd}>
          <Icon icon="plus-lg" size="24px" color="#b7b7b7" />
        </PlusBtn>
      </TitleBox>
      <List>
        {docList.map((doc, idx) => (
          <DocListItem
            key={idx}
            doc={doc}
            isCurrentDoc={docId === doc.docId ? true : false}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.aside`
  --WSHeaderHeight: 48px;
  width: 260px;
  max-height: calc(100vh - var(--WSHeaderHeight) + 20px);
  border-right: 1px solid var(--line);
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
