import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styleProfile from './profile.module.css';
import { ProfileNavigation } from '../../components/profile-navigation/profile-navigation';
import { ProfileUserForm } from '../../components/profile-user-form/profile-user-form';

export const Profile = () => {
  return (
    <section className={styleProfile.section}>
      {' '}
      <ProfileNavigation />
      <Switch>
        <Route path='/profile' exact>
          <ProfileUserForm />
        </Route>
        <Route path='/profile/:id' exact>
          <ProfileUserForm />
        </Route>
        <Route path='/profile' exact>
          <ProfileUserForm />
        </Route>
      </Switch>
    </section>
  );
};
