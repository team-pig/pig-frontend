import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { __confirm } from "../redux/modules/confirm";


let resolveCallback;
const Confirm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state)=>state.confirm.show)

  const onConfirm = (e) => {
    e.stopPropagation();
    closeConfirm(show);
    resolveCallback(true);
  };

  const onCancel = (e) => {
    e.stopPropagation();
    closeConfirm(show);
    resolveCallback(false);
  };
  const confirm = () => {
    dispatch(__confirm(show));
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch(__confirm(show));
  };

  return { confirm, onConfirm, onCancel };
};

export default Confirm;
