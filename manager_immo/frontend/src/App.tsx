import React from 'react';
import dayjs from 'dayjs';
import {BrowserRouter as Router} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { AppRoutes } from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

dayjs.locale('en');

import { UserContextProvider } from './contexts/userContext'

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <UserContextProvider>
        <Router>
          <AppRoutes />
          <ToastContainer />
        </Router>
      </UserContextProvider>
    </ConfigProvider>
  );
}

export default App
