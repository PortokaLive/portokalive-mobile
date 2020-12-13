import React from "react";
import { getLiveLists } from "../utils/redux/actions/ActionLive";

export default () => {
  React.useEffect(() => {
    getLiveLists().catch((ex) => {
      console.error(ex);
    });
  }, []);

  return <></>;
};
