import React from "react";
import styled from "styled-components";

const Graph = ({ percent, color, height }) => {
  return (
    <Background height={height}>
      <Gauge percent={percent} color={color}></Gauge>
    </Background>
  );
};

const Background = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "15px")};
  background-color: var(--line);
  border-radius: 30px;
  overflow: hidden;
`;

const Gauge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.percent}%;`};
  height: 100%;
  background-color: ${(props) =>
    props.color === "point"
      ? "var(--point)"
      : props.theme.colors[`${props.color}`]};
  transition: width ease-in-out 200ms;
`;

export default Graph;
