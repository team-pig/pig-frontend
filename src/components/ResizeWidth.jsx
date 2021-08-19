import React from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";

// initialSize = {width: "260px", height: "100%"}
// drag : "right" or "left"
// option : min·max Width/Height
// storeSaveFunc : dispatch할 actionCreator
const ResizeWidth = ({
  size,
  handleSize,
  drag,
  option,
  storeSaveFunc,
  children,
}) => {
  const dispatch = useDispatch();

  const onResize = (event, dir, refToElement, delta, position) => {
    handleSize(refToElement.style.width.split("px")[0]);
  };

  const onResizeStop = (event) => {
    dispatch(storeSaveFunc(size.width));
  };

  return (
    <Rnd
      default={{
        x: drag === "right" ? 0 : null, // left 일 때 추가 필요
        y: 0,
        width: size.width,
        height: size.height,
      }}
      resizeGrid={[1, 1]}
      disableDragging={true}
      bounds="window"
      enableResizing={{
        top: false,
        bottom: false,
        right: drag === "right" ? true : false,
        left: drag === "left",
      }}
      onResize={onResize}
      onResizeStop={onResizeStop}
      style={{ zIndex: 25 }} // var가 안됨
      {...option}
    >
      {children}
    </Rnd>
  );
};

export default ResizeWidth;
