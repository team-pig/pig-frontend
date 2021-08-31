import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import moment from "moment";

// component & elem
import Graph from "./Graph";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import Icon from "../../components/Icon";

import { body_3, body_4, sub_1 } from "../../themes/textStyle";

const ProjectStatus = ({ inMore }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const { checked, notChecked } = useSelector(
    (state) => state.todos.projectStatus
  );

  const { isMobile } = useSelector((state) => state.resize);

  const guagePercent = isNaN(
    ((checked / (checked + notChecked)) * 100).toFixed(0)
  )
    ? 0
    : ((checked / (checked + notChecked)) * 100).toFixed(0);

  return (
    <Project>
      <ProjectTitle type="body_1">
        프로젝트 현황
        {isMobile && !inMore && (
          <button
            type="button"
            onClick={() => history.push(`${url}/main/status`)}
          >
            <MoreText type="body_4" color="grey">
              더보기 <Icon icon="arrow-right" size="14px" />
            </MoreText>
          </button>
        )}
      </ProjectTitle>
      <ProjectInfo>
        <Text type="body_2" color="">
          {`${guagePercent}% 완료(${checked} / ${checked + notChecked})`}
        </Text>
        <Line />
        <TodayDate>
          오늘은 {moment(Date.now()).format("YY년 M월 DD일")} 입니다.
        </TodayDate>
      </ProjectInfo>
      <Graph
        color="point"
        height={isMobile ? "15px" : "30px"}
        percent={guagePercent}
      />
    </Project>
  );
};

const Project = styled.article`
  height: 160px;
  padding: 20px 18px 20px 25px;
  border-bottom: 1px solid var(--line);

  ${({ theme }) => theme.device.mobile} {
    ${flex("center", "start", false)}
    width: 100%;
    padding: 20px;
    border-bottom: none;
  }
`;

const ProjectTitle = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    width: 100%;
    ${flex("between", "center")}
    ${sub_1}
  }
`;

const ProjectInfo = styled.div`
  ${flex("start", "center")};
  margin-top: 31px;
  margin-bottom: 10px;

  ${({ theme }) => theme.device.mobile} {
    margin-top: 14px;
  }
`;

const Line = styled.div`
  height: 2rem;
  width: 1px;
  margin: 0 15px;
  background-color: var(--grey);
`;

const MoreText = styled(Text)`
  ${flex("start", "center")}
  cursor: pointer;
`;

const TodayDate = styled.div`
  ${body_3};
  color: var(--notice);
  ${({ theme }) => theme.device.mobile} {
    ${body_4}
  }
`;

export default ProjectStatus;
