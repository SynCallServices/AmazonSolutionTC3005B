import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify';
import awsconfig from "./aws-exports";
import AWS from 'aws-sdk';
import './css/index.css';

import App from './App.js'

AWS.config.update({
    apiVersion: 'latest',
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

Amplify.configure(awsconfig);

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('root')
)
