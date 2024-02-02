import React from "react";
import {BrowserRouter} from "react-router-dom";
import {init, loadRemote} from '@module-federation/runtime'

init({
  name: 'app1',
  remotes: [
    {
      name:'app2',
      entry: 'http://localhost:3002/remoteEntry.js'
    },
    {
      name:'app3',
      entry: 'http://localhost:3003/remoteEntry.js'
    },
    {
      name:'app4',
      entry: 'http://localhost:3004/remoteEntry.js'
    },
  ]
})

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    const Module = await loadRemote(`${scope}/${module.slice(2)}`);
    return Module;
  };
}

const urlCache = new Set();
const useDynamicScript = url => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl, scope, module) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};

const App = () => {

  const [{ module, scope, url }, setSystem] = React.useState({});

  function setApp2() {
    setSystem({
      url: 'http://localhost:3002/remoteEntry.js',
      scope: 'app2',
      module: './injectApp',
    });
  }

  function setApp3() {
    setSystem({
      url: 'http://localhost:3003/remoteEntry.js',
      scope: 'app3',
      module: './injectApp3',
    });
  }
  function setApp4() {
    setSystem({
      url: 'http://localhost:3004/remoteEntry.js',
      scope: 'app4',
      module: './injectApp4',
    });
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(url, scope, module);

  return (
    <BrowserRouter>

      <h1>Host Application - React Version {React.version}</h1>
        <h2>App 1</h2>
        <h1>Dynamic System Host</h1>
        <h2>App 1</h2>
        <p>
          The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
          <strong>exposes</strong>. It will no load components that have been loaded already.
        </p>
        <button onClick={setApp2}>Load App 2 Widget</button>
        <button onClick={setApp3}>Load App 3 Widget</button>
        <button onClick={setApp4}>Load App 3 Widget</button>
        <div style={{ marginTop: '2em' }}>
            {errorLoading
                ? `Error loading module "${module}"`
                : FederatedComponent && <FederatedComponent />}
        </div>
        <div id={'parent'}></div>
        <div id={'root-2'}></div>
        <app-root></app-root>
        {/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
        {/*  <Link to="/react-app">Show Remote React App</Link>*/}
        {/*  <Link to="/app3">Show Remote Angular App</Link>*/}
        {/*  <Link to="/app4">Show Remote Angular App 4</Link>*/}
        {/*</div>*/}
        {/*<Suspense fallback={<h1>Loading</h1>}>*/}
        {/*<Routes>*/}
        {/*  <Route path="/react-app" element={<RemoteReactApp />} />*/}
        {/*  <Route path="/app3" element={<RemoteAngularApp />} />*/}
        {/*  <Route path="/app4" element={<RemoteAngularApp4 />} />*/}
        {/*</Routes>*/}
        {/*</Suspense>*/}

    </BrowserRouter>
  );
};

export default App;
