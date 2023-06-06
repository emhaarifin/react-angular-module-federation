import React from "react";
import RemoteReactApp from "./RemoteReactApp";
import RemoteAngularApp from "./RemoteAngularApp";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Host Application - React Version {React.version}</h1>
        <h2>App 1</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/react-app">Show Remote React App</Link>
          <Link to="/angular-app">Show Remote Angular App</Link>
        </div>
        <Routes>
          <Route path="/react-app" element={<RemoteReactApp />} />
          <Route path="/angular-app" element={<RemoteAngularApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
