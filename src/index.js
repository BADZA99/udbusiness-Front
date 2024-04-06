import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import { Reset } from "styled-reset";
// import { createGlobalStyle } from "styled-components";
// import reset from "styled-reset";

// const GlobalStyle = createGlobalStyle`
//   ${reset}
//   /* other styles */
// `;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
    <Reset />
      <App />
    </NextUIProvider>
  </React.StrictMode>
);


