import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { __confirm } from "../redux/modules/confirm";


let resolveCallback;
const Confirm = () => {
  const dispatch = useDispatch();
  const show = useSelector((state)=>state.confirm.show)

  // 확인 클릭 시 실행, true를 반환
  const onConfirm = (e) => {
    e.stopPropagation();
    closeConfirm(show);
    resolveCallback(true);
  };

  // 확인 클릭 시 실행, false를 반환
  const onCancel = (e) => {
    e.stopPropagation();
    closeConfirm(show);
    resolveCallback(false);
  };

  // window.confirm()의 확인, 취소 기능 구현을 위해 
  // Promise 사용하여 true, false 값 받은 이후 액션 실행
  const confirm = (show, msg) => {
    dispatch(__confirm(show, msg));
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
