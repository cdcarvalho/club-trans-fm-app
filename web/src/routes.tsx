import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './_services/auth';

import Login from './_components/public/login/Login';
import Dashboard from './_components/admin/dashboard/Dashboard';
import ListUser from './_components/admin/user/ListUser';
import CreateUser from './_components/admin/user/CreateUser';
import EditUser from './_components/admin/user/EditUser';
import ListCommercial from './_components/admin/commercial/ListCommercial';
import CreateCommercial from './_components/admin/commercial/CreateCommercial';
import EditCommercial from './_components/admin/commercial/EditCommercial';
import ListSpeaker from './_components/admin/speaker/ListSpeaker';
import CreateSpeaker from './_components/admin/speaker/CreateSpeaker';
import EditSpeaker from './_components/admin/speaker/EditSpeaker';
import ListExpense from './_components/admin/expense/ListExpense';
import CreateExpense from './_components/admin/expense/CreateExpense';
import EditExpense from './_components/admin/expense/EditExpense';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
)

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Login} path="/" exact />
                <PrivateRoute component={Dashboard} path="/dashboard" exact />
                <PrivateRoute component={ListUser} path="/user/list" />
                <PrivateRoute component={CreateUser} path="/user/create" />
                <PrivateRoute component={EditUser} path="/user/edit/:id" />
                <PrivateRoute component={ListCommercial} path="/commercial/list" />
                <PrivateRoute component={CreateCommercial} path="/commercial/create" />
                <PrivateRoute component={EditCommercial} path="/commercial/edit/:id" />
                <PrivateRoute component={ListSpeaker} path="/speaker/list" />
                <PrivateRoute component={CreateSpeaker} path="/speaker/create" />
                <PrivateRoute component={EditSpeaker} path="/speaker/edit/:id" />
                <PrivateRoute component={ListExpense} path="/expense/list" />
                <PrivateRoute component={CreateExpense} path="/expense/create" />
                <PrivateRoute component={EditExpense} path="/expense/edit/:id" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;