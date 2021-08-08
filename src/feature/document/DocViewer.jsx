import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// redux & api
import { docApi } from "../../api/docApi";

// elem
import { Text } from "../../elem";
import Icon from "../../components/Icon";
import { body_4 } from "../../themes/textStyle";
import flex from "../../themes/flex";
import MarkDownViewer from "../../components/MarkDownViewer";

const DocViewer = () => {
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
  const currentDoc = useSelector((state) => {
    const idx = state.document.docList.findIndex((doc) => doc.docId === docId);
    return state.document.docList[idx];
  });

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
      else alert(`현재${data.nickname}님이 수정중입니다.`);
    } catch (e) {
      console.log(e);
    }
  };

  // 현재 시간과 마지막 수정시간(없을 경우 최초 작성시간)과의 차이를 text로 return하는 함수
  const getModifiedTime = () => {
    let target;
    if (docId === current.docId) {
      if (current.modifiedAt) {
        target = moment.utc(current.modifiedAt); // 한국시간으로 바꿔줌
      } else if (current.createAt) {
        target = moment.utc(current.modifiedAt);
      }
      const now = moment();
      const diff = {
        day: moment.duration(now.diff(target)).days(),
        hours: moment.duration(now.diff(target)).hours(),
        minute: moment.duration(now.diff(target)).minutes(),
        second: moment.duration(now.diff(target)).seconds(),
      };
      const text = `${diff.day !== 0 ? diff.day + "일" : ""} ${
        diff.hours !== 0 ? diff.hours + "시간" : ""
      } ${diff.minute !== 0 ? diff.minute + "분" : "0분"} 전`.trim();

      return text;
    }
  };

  return (
    <Container>
      <ViewerHeader>
        <TitleBox>
          <Title type="head_4">{current.title}</Title>
          {/* 임시 적용 아이콘 => 변경 예정 */}
          <IconBtn onClick={() => toDocEdit(docId)}>
            <Icon icon="edit" size="24px" color="#757575" />
          </IconBtn>
        </TitleBox>
        {current && current.modifiedAt && (
          <InfoBox>
            마지막 편집
            <User>{current.nickname}</User>
            <ModifiedTime>{getModifiedTime()}</ModifiedTime>
          </InfoBox>
        )}
      </ViewerHeader>
      <div></div>
      {current.content && <MarkDownViewer option={viewerOpt} />}
    </Container>
  );
};

// 임시 스타일
const Container = styled.section`
  --header: 48px;
  --minusHeight: calc(var(--header));

  display: flex;
  min-height: calc(100vh - var(--minusHeight));
  flex-direction: column;
  width: calc(100% - 260px);
  padding: var(--smMargin);
`;

const ViewerHeader = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const TitleBox = styled.div`
  ${flex("between")}
  width: 100%;
  height: 40px;
  margin-bottom: 14px;
`;

const Title = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoBox = styled.div`
  ${body_4};
  ${flex("end")};
  flex-shrink: 0;
  color: var(--grey);
`;

const IconBtn = styled.button``;

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

export default DocViewer;
