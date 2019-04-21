import React, { PureComponent } from 'react';

import { auth } from '../../services/firebase';
import { withUser } from '../withUser';
import './User.scss';

class User extends PureComponent {
  render() {
    const profileImg = auth.currentUser.providerData[0].photoURL;
    const profileName = auth.currentUser.providerData[0].displayName;
    const profileNameSpace = profileName !== null && profileName.includes(' ');
    const space = profileNameSpace && profileName.indexOf(' ');
    const trimmedName = profileNameSpace ? profileName.slice(0, space) : 'User';

    return (
      <div className={'userDiv'}>
        <img src={profileImg ? profileImg : null} alt="avatar" className={'avatar'} />
        <p className={'welcome-text'}>
          Welcome, {trimmedName}!
        </p>
      </div>
    );
  }
}

export default withUser(User);
