import React from 'react';
import ReactDOM from 'react-dom';
//import './assets/styles/App.css';
import Home from './components/Home'
import reportWebVitals from './tests/reportWebVitals';
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import RecordButtons from './components/RecordButtons';

Amplify.configure(awsConfig);

ReactDOM.render(
  <React.StrictMode>
    <RecordButtons />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
