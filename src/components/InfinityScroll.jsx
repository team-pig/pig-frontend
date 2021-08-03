import React from "react";
import _ from "lodash";

const InfinityScroll = ({ children, callNext, isNext, isLoading }) => {
 
  const _handleScroll = _.throttle(() => {
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

  const handleScroll = React.useCallback(_handleScroll, [isLoading]);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isNext) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNext, isLoading]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default InfinityScroll;
