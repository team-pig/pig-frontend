import React from "react";
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

  const defaultHandleScroll = React.useCallback(_defaultHandleScroll, [isLoading]);


 

  React.useEffect(() => {
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

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;
