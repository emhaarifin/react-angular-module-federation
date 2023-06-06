import React, { useEffect } from "react";
import angularInject from "app4/injectApp4";

const parentElementId = "parent-app-4";

const RemoteAngularApp4 = () => {
  useEffect(() => {
    angularInject();
  }, []);

  return <app-root />;
};

export default RemoteAngularApp4;
