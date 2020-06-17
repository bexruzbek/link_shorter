import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import AuthPage from './components/pages/AuthPage';
import RegisterPage from './components/pages/RegisterPage';
import CreatePage from './components/pages/CreatePage';
import LinksPage from './components/pages/LinksPage';
import PrivateRoute from './components/routing/PrivateRoute';

export const useRoutes = () => {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={LinksPage} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/create" component={CreatePage} />
        <PrivateRoute exact path="/links" component={LinksPage} />
        <Route exact path="/login" component={AuthPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route component={NotFound} />
      </Switch>
    )
}