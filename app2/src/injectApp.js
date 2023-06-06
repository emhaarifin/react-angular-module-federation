import App from './App';
import React from 'react';

import { createRoot } from "react-dom/client";
const injector = parentElementId => {
    const container = document.getElementById('parent');
    const root = createRoot(container)

    root.render(<App/>);
}

export default injector;
