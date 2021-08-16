import React, { useEffect, useState } from "react";
import styled from "styled-components";
import flex from "../../themes/flex";
import { Text } from "../../elem";
import Icon from "../../components/Icon";
import Graph from "./Graph";
import Tags from "./Tags";
import { body_4, head_7 } from "../../themes/textStyle";

// redux & api
import { __editMyProfile } from "../../redux/modules/dashBoard";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//etc
const MyStatus = ({ myNewInfo, setMyNewInfo }) => {
  const dispatch = useDispatch();
  const { nickname, desc, checked, notChecked, tags } = myNewInfo;
  const [editMode, setEditMoe] = useState(false);
  const { roomId } = useParams();

  const memberPercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  const editMyInfoHandler = ({ target: { value, name } }) => {
    setMyNewInfo({ ...myNewInfo, [name]: value });
  };

  if (editMode)
    return (
      <Container>
        <EditModeWrapper>
          <EditModeHeader>
            <Name type="head_7" color="black">
              {nickname}
            </Name>
            <ActiveEdit
              onClick={() => {
                setEditMoe(false);
                dispatch(
                  __editMyProfile(roomId, {
                    desc: myNewInfo.desc,
                    tags: myNewInfo.tags,
                  })
                );
              }}
            >
              <Icon icon="checkbox" size="24px" color="#757575" />
            </ActiveEdit>
          </EditModeHeader>
          <form
            onSubmit={() => {
              setEditMoe(false);
              dispatch(
                __editMyProfile(roomId, {
                  desc: myNewInfo.desc,
                  tags: myNewInfo.tags,
                })
              );
            }}
          >
            <InputWrapper>
              <MyInfoEditInput
                tyoe="text"
                name="desc"
                value={desc || ""}
                onChange={editMyInfoHandler}
              />
            </InputWrapper>
            <InputWrapper>
              <MyInfoEditInput
                type="text"
                name="tags"
                value={tags || ""}
                onChange={editMyInfoHandler}
              />
            </InputWrapper>
          </form>
          <HelpMessage>
            역할은 " , " 로 구분해서 작성할 수 있습니다.
          </HelpMessage>
        </EditModeWrapper>
      </Container>
    );
  return (
    <Container>
      <MemberMain>
        <Name type="head_7" color="black">
          {nickname}
        </Name>
        <ActiveEdit
          onClick={() => {
            setEditMoe(true);
          }}
        >
          <Icon icon="setting" size="24px" color="#757575" />
        </ActiveEdit>
        <GraphBox>
          <Graph color="mint" height="15px" percent={memberPercent} />
        </GraphBox>
      </MemberMain>
      <Message>
        <Desc type="body_4" color="darkgrey">
          {desc === null ? "상태 메시지가 없습니다." : desc}
        </Desc>
        <StatusNums>
          <Text type="body_2" color="darkgrey">
            {memberPercent}% 완료
          </Text>
          <Text type="body_4" color="grey">
            ({checked} / {checked + notChecked})
          </Text>
        </StatusNums>
      </Message>
      <MemberInfo>
        <Tags tag={tags} />
        {/* <Line /> */}
      </MemberInfo>
    </Container>
  );
};

const Container = styled.article`
  border-bottom: 1px solid var(--line);
  /* border: 1px solid red; */
`;

const MemberMain = styled.div`
  ${flex("start")};
  margin-top: 23px;
  margin-bottom: 15px;
`;

const Name = styled(Text)`
  position: relative;
  width: 130px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-right: 8px;
`;

const GraphBox = styled.div`
  width: 220px;
  margin-left: 50px;
  flex-shrink: 0;
`;

const Desc = styled.div`
  ${body_4};
  color: var(--darkgrey);
`;
const MemberInfo = styled.div`
  ${flex("start")};
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const StatusNums = styled.div`
  ${flex("start", "center")};
  gap: 13px;
  height: 30px;
`;

const Line = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 15px;
  background-color: var(--grey);
`;

const MyInfoEditInput = styled.input`
  border: 1px solid var(--line);
  height: 30px;
  margin-bottom: 5px;
  padding: 0 10px;
  width: 100%;
`;

const EditModeWrapper = styled.div``;
const EditModeHeader = styled.div`
  ${flex("between", "center")}
  margin-top: 23px;
  margin-bottom: 15px;
`;

const ActiveEdit = styled.div`
  cursor: pointer;
`;

const Message = styled.div`
  ${flex("between", "center")}
  margin-bottom: 10px;
`;

const InputWrapper = styled.div``;

const HelpMessage = styled.div`
  ${body_4}
  text-align: right;
  color: var(--notice);
  margin-bottom: 20px;
`;

const NickName = styled.div`
  ${head_7}
  color : var(--black)
`;

export default MyStatus;
