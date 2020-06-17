import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import {useRoutes} from './routes';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.css';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import LinkState from './context/link/LinkState';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const routes = useRoutes();
  return (
    <AuthState>
      <LinkState>
        <AlertState>
          <Router>
            <Navbar />
            <div className="container">
              <Alerts />
              {routes}
            </div>
          </Router>
        </AlertState>
      </LinkState>
    </AuthState>
  );
}

export default App;
