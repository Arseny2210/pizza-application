import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/styles/app.scss'
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './routes/AppRouter'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AppRouter>
      <App/>
    </AppRouter>
  </BrowserRouter>
);
