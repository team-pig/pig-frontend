import React, {useEffect, useCallback} from "react";
import _ from "lodash";

const InfinityScroll = ({  children, callNext, isNext, isLoading }) => {

 const _defaultHandleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 600) {
      // if (loading) {
      //   return;
      // }
      callNext();
    }
  }, 700);

  const defaultHandleScroll = useCallback(_defaultHandleScroll, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isNext) {
      window.addEventListener("scroll", defaultHandleScroll);
    } else{
      window.removeEventListener("scroll", defaultHandleScroll);
    }
    return () => window.removeEventListener("scroll", defaultHandleScroll);
  }, [isNext, isLoading]);

  return <>{children}</>;
};

export default InfinityScroll;
