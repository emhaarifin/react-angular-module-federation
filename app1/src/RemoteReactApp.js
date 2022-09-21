import React, { useEffect } from "react";
import inject from "app2/injectApp";

const parentElementId = "parent";

const RemoteReactApp = () => {
  useEffect(() => {
    inject(parentElementId);
  }, []);

  return <div id={parentElementId}></div>;
};

export default RemoteReactApp;
