import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// function
import getModifiedTime from "../../functions/getModifiedTime";

// component & elem
import MarkDownViewer from "../../components/MarkDownViewer";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import { body_4, head_5, sub_1 } from "../../themes/textStyle";
import { Text, IconBtn } from "../../elem";

// redux & api
import { docApi } from "../../api/docApi";

const DocViewer = ({ left }) => {
  const history = useHistory();
  const { roomId, docId } = useParams();

  const dispatch = useDispatch();

  const initial = {
    title: "",
    content: "",
    nickname: "",
  };

  const [current, setCurrent] = useState(initial);

  // 최적화 반드시 필요✨
  const currentDoc = useSelector((state) => state.document.currentDoc);

  useEffect(() => {
    setCurrent(currentDoc ? currentDoc : initial);
  }, [currentDoc, dispatch]);

  const viewerOpt = {
    initialValue: current.content,
  };

  const toDocEdit = async (docId) => {
    try {
      const { data } = await docApi.checkCanEdit(roomId, docId);

      if (data.canEdit) history.push(`/workspace/${roomId}/doc/${docId}/edit`);
      else alert(`지금 ${data.nickname}님이 수정중이에요.`);
    } catch (e) {
      console.log(e);
    }
  };

  let modifiedTime;

  if (docId === current.docId) {
    modifiedTime = getModifiedTime(current);
  }

  return (
    <Container left={left}>
      <ViewerHeader>
        <TitleBox>
          <Title type="head_5">{current.title}</Title>
          <IconBtn _onClick={() => toDocEdit(docId)}>
            <Icon icon="edit" size="24px" color="#757575" />
          </IconBtn>
        </TitleBox>
        {current && current.modifiedAt && (
          <InfoBox>
            마지막 편집
            <User>{current.nickname}</User>
            <ModifiedTime>{modifiedTime}</ModifiedTime>
          </InfoBox>
        )}
      </ViewerHeader>
      <ViewerBody>
        {current.content && <MarkDownViewer option={viewerOpt} />}
      </ViewerBody>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  top: 0;
  left: ${(props) => `${props.left}px;`};
  display: flex;
  flex-direction: column;
  width: ${(props) => `calc(100% - ${props.left}px)`};
  height: 100%;
  padding: var(--smMargin) var(--mdMargin);
  overflow-y: auto;

  ${({ theme }) => theme.device.tablet} {
    padding: var(--smMargin);
  }

  ${({ theme }) => theme.device.mobile} {
    --header: 48px;
    --docBar: 48px;
    --nav: 60px;

    left: 0;
    width: 100%;
    height: calc(100vh - var(--header) - var(--docBar) - var(--nav));
  }
`;

const ViewerHeader = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const TitleBox = styled.div`
  ${flex("start")}
  width: 100%;
  height: 40px;
  margin-bottom: 14px;
`;

const Title = styled(Text)`
  ${head_5}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => theme.device.mobile} {
    ${sub_1};
  }
`;

const InfoBox = styled.div`
  ${body_4};
  ${flex("end")};
  flex-shrink: 0;
  color: var(--grey);
`;

const User = styled.span`
  margin-left: 14px;
`;

const ModifiedTime = styled.span`
  color: var(--notice);

  &::before {
    content: "·";
    margin: 0 4px;
    color: var(--grey);
  }
`;

const ViewerBody = styled.div`
  width: 100%;
`;

export default DocViewer;
