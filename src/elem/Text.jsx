import React from "react";

const Text = ({ _onClick, children }) => {
  return <div onClick={_onClick}>{children}</div>;
};

export default Text;
