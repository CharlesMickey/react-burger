import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styleProfile from './profile.module.css';
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation';
import { ProfileUserForm } from '../../components/profile-user-form/profile-user-form';
import { useDispatch } from '../../services/type/hooks';
import { getUserProfile } from '../../services/actions/auth';
import OrdersHistory from '../../components/orders-history/orders-history';

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <section className={styleProfile.section}>
      {' '}
      <ProfileNavigation />
      <Switch>
        <Route path='/profile' exact>
          <ProfileUserForm />
        </Route>
        <Route path='/profile/orders' exact>
          <OrdersHistory />
        </Route>
      </Switch>
    </section>
  );
};
