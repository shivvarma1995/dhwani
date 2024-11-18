import React from 'react'
import { Navigate, Route } from 'react-router-dom';
const isAuthenticated = () => {
    // return !!localStorage.getItem('subscription_id');
};
const PrivateRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? (
        <Route {...rest} element={element} />
      ) : (
        <Navigate to="/login" />
      );
}
export default PrivateRoute