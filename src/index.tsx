import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from 'App';

const rootElement = document.getElementById('app');

if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
