import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router";

// redux
import { useSelector, useDispatch } from "react-redux";
import { __editMyStatus } from "../redux/modules/todos";

// elem
import MemberStatus from "../feature/main/MemberStatus";
import ProjectStatus from "../feature/main/ProjectStatus";
import Icon from "../components/Icon";
import Graph from "../feature/main/Graph";
import MyAvatar from "../elem/MyAvatar";
import { body_2, body_4, sub_1 } from "../themes/textStyle";
import flex from "../themes/flex";
import Tags from "../feature/main/Tags";
import { useHistory } from "react-router-dom";

const StatusM = () => {
  const dispatch = useDispatch();
  const memberStatus = useSelector((state) => state.todos.memberStatus);
  const myStatus = useSelector((state) => state.todos.myStatus);
  const resize = useSelector((state) => state.resize);
  const { nickname, desc, tags, checked, notChecked } = myStatus;

  const [editInfo, setEditInfo] = useState({});
  const [viewTag, setViewTag] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    setEditInfo({ desc, tags });
  }, [desc, tags, dispatch]);

  // mobile에서 web으로 resize 할 때, 페이지 이동 및 router 제한
  useEffect(() => {
    if (!resize.isMobile) history.replace(`/workspace/${roomId}`);
  }, [resize, roomId, history]);

  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  const onChangeHandler = useCallback(
    ({ target: { value, name } }) => {
      setEditInfo({ ...editInfo, [name]: value });
    },
    [editInfo]
  );

  const colorAry = ["yellow", "orange", "mint", "blue"];
  return (
    <Container>
      <ProjectStatus inMore />
      {editMode ? (
        <My>
          <EditModeHeader>
            <Profile>
              <MyAvatar medium />
              <Name>{nickname}</Name>
            </Profile>
            <Icon
              icon="checkbox"
              size="24px"
              color="var(--darkgrey)"
              onClick={() => {
                setEditMode(false);
                dispatch(
                  __editMyStatus(roomId, {
                    desc: editInfo.desc,
                    tags: editInfo.tags,
                  })
                );
              }}
            />
          </EditModeHeader>
          <form>
            <MyInfoEditInput
              tyoe="text"
              name="desc"
              value={editInfo.desc || ""}
              onChange={onChangeHandler}
              placeholder="나의 메시지를 입력하세요 (최대 25자)"
              autoComplete="off"
              maxLength="25"
            />
            <MyInfoEditInput
              type="text"
              name="tags"
              value={editInfo.tags || ""}
              onChange={onChangeHandler}
              placeholder="나의 역할 또는 태그로 나를 표현하세요"
              autoComplete="off"
              maxLength="200"
            />
          </form>
          <HelpMessage>
            역할은 " , " 로 구분해서 작성할 수 있습니다.
          </HelpMessage>
        </My>
      ) : (
        <My>
          <MyTitle>
            <Title>팀원 현황</Title>
            <Icon
              icon="setting"
              size="24px"
              color="var(--grey)"
              onClick={() => {
                setEditMode(true);
              }}
            />
          </MyTitle>
          <MyHeader>
            <Profile>
              <MyAvatar medium />
              <Name>{nickname}</Name>
            </Profile>
            <Done>{memberPercent}% 완료</Done>
          </MyHeader>
          <Desc>{desc === null ? "상태 메시지가 없습니다." : desc}</Desc>
          <GraphWrap>
            <Graph color="blue" height="15px" percent={memberPercent} />
          </GraphWrap>
          <MyTags>
            <TagToggle
              onClick={() => {
                setViewTag((pre) => !pre);
              }}
            >
              {viewTag ? "태그 접기" : "태그 보기"}
              <Icon icon="arrow-down" size="14px" color="var(--grey)" />
            </TagToggle>
            {viewTag && <Tags tag={tags} />}
          </MyTags>
        </My>
      )}
      {memberStatus &&
        memberStatus.map((member, idx) => (
          <MemberStatus
            key={member.userId}
            member={member}
            graphColor={colorAry[idx % 4]}
          />
        ))}
    </Container>
  );
};

// common
const Container = styled.div`
  width: 100%;
  padding-bottom: 60px;
`;

// My status
const My = styled.div`
  min-height: 210px;
  padding: 20px;
  border-bottom: 1px solid var(--line);
  border-top: 1px solid var(--line);
`;
const MyTitle = styled.div`
  ${flex("between")};
  margin-bottom: 25px;
`;
const Title = styled.div`
  ${sub_1}
`;

const MyHeader = styled.div`
  ${flex("between", "center")}
  margin-bottom: 14px;
`;
const Profile = styled.div`
  ${flex("start")}
  gap: 20px;
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
  margin-bottom: 14px;
`;

const Name = styled.div`
  ${body_2};
`;

const Done = styled.div`
  ${body_4};
`;

const GraphWrap = styled.div`
  margin-bottom: 14px;
  max-width: 350px;
`;

const MyTags = styled.div``;
const TagToggle = styled.div`
  ${body_4};
  ${flex("end")}
  gap: 5px;
  color: var(--darkgrey);
`;

const HelpMessage = styled.div`
  ${body_4}
  text-align: right;
  color: var(--notice);
  margin-bottom: 20px;
`;

// 수정 모드

const EditModeHeader = styled.div`
  ${flex("between", "center")}
  margin-bottom: 14px;
`;

const MyInfoEditInput = styled.input`
  border: 1px solid var(--line);
  height: 30px;
  margin-bottom: 5px;
  padding: 0 10px;
  width: 100%;
`;

export default StatusM;
