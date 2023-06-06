import React, { useEffect } from "react";
import angularInject from "app3/injectApp3";

const parentElementId = "parent";

const RemoteAngularApp = () => {
  useEffect(() => {
    angularInject();
  }, []);

  return <app-root />;
};

export default RemoteAngularApp;
