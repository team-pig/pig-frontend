import React, { useCallback, memo } from "react";
import Joyride from "react-joyride";
import { useDispatch } from "react-redux";
import { __modifyTutorialStatus } from "../../redux/modules/user";

// 튜토리얼 컴포넌트
const JoyrideContainer = ({ run, steps, page }) => {
  const dispatch = useDispatch();

  // status가 "finished"일 때 (모든 튜토리얼을 봤거나 중간에 취소하거나 Skip한 경우) 서버에게 해당 유저의 튜토리얼 상태 변경 요청
  const handleJoyrideCallback = useCallback(
    (data) => {
      const { status } = data;

      if (status === "finished" || status === "skipped") {
        dispatch(__modifyTutorialStatus(page));
      }
    },
    [dispatch, page]
  );

  // 스타일 옵션
  const defaultOptions = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: " #4D6C56",
    spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
    textColor: "#333",
    width: undefined,
    zIndex: 100,
  };

  return (
    <Joyride
      continuous={true}
      run={run}
      steps={steps}
      styles={{ options: defaultOptions }}
      scrollToFirstStep={false}
      showProgress={true}
      showSkipButton={true}
      disableScrolling={true}
      disableScrollParentFix={true}
      callback={handleJoyrideCallback}
    />
  );
};

export default memo(JoyrideContainer);
