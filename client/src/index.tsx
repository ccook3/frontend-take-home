import React from 'react';
import '@radix-ui/themes/styles.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Theme } from '@radix-ui/themes';
import { SWRConfig } from 'swr';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: true,
      }}
    >
      <Theme accentColor="violet" grayColor="slate" scaling="100%">
        <App />
      </Theme>
    </SWRConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
