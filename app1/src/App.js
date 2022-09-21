import React, { useEffect } from "react";
import inject from "app2/injectApp";
import angularInject from "app3/inject";

const parentElementId = "parent";

const App = () => {
  useEffect(() => {
    inject(parentElementId);
    angularInject();
  }, []);

  // App2 will be injected in the div with parentElementId
  return (
    <div>
      <h1>Host Application - React Version {React.version}</h1>
      <h2>App 1</h2>
      <div id={parentElementId}></div>
      <app-root />
    </div>
  );
};

export default App;
