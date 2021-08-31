import React, { useCallback, memo } from "react";
import Joyride from "react-joyride";
import { useDispatch } from "react-redux";
import { __modifyTutorialStatus } from "../../redux/modules/user";

const JoyrideContainer = ({ run, steps, page }) => {
  const dispatch = useDispatch();

  const handleJoyrideCallback = useCallback(
    (data) => {
      const { status } = data;

      if (status === "finished") {
        dispatch(__modifyTutorialStatus(page));
      }
    },
    [dispatch, page]
  );

  const defaultOptions = {
    arrowColor: "#fff",
    backgroundColor: "#fff",
    beaconSize: 36,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    primaryColor: "#f04",
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
