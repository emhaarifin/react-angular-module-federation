import React, { useEffect } from "react";
import angularInject from "app3/inject";

const parentElementId = "parent";

const RemoteReactApp = () => {
  useEffect(() => {
    angularInject();
  }, []);

  return <app-root />;
};

export default RemoteReactApp;
