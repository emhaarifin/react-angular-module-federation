import React, {lazy} from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Component1 from "./Component1";
import Component2 from "./Component2";

const App = () => (
  <BrowserRouter>
    <div
      style={{
        border: "1px red solid",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Remote Application - React Version {React.version}</h1>
      <h2>App 2</h2>
      <Link to="/path1">Go to Component1 Route</Link>
      <Link to="/path2">Go to Component2 Route</Link>
      <Routes>
        <Route path="/path1" element={<Component1 />} />
        <Route path="/path2" element={<Component2 />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
