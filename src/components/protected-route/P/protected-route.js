import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getNewAccessToken } from '../../../services/actions/auth';

const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const refreshToken = Boolean(localStorage.refreshToken);

  useEffect(() => {
    if (refreshToken) {
      dispatch(getNewAccessToken());
    }
  }, [dispatch, refreshToken]);

  return (
    <Route
      {...rest}
      render={() =>
        refreshToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
