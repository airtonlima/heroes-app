import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch
} from 'react-router-dom';

import { AuthContext } from '../auth/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRotues } from './DashboardRotues';

export const AppRouter = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={ user.logged }
                    />

                    <PrivateRoute 
                        path="/" 
                        component={ DashboardRotues } 
                        isAuthenticated={ user.logged }
                    />
                </Switch>
            </div>
        </Router>
    )
}