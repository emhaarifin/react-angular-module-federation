import React, { useEffect } from "react";
import inject from "app2/injectApp";
import AngularComponent from "app3/Component";

const parentElementId = "parent";

const App = () => {
  useEffect(() => {
    inject(parentElementId);
  }, []);

  // App2 will be injected in the div with parentElementId
  return (
    <div>
      <h1>Host Application - React Version {React.version}</h1>
      <h2>App 1</h2>
      <div id={parentElementId}></div>
      <AngularComponent />
    </div>
  );
};

export default App;
