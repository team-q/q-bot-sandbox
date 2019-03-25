import React, { PureComponent } from 'react';
import { signOut } from '../services/firebase';
import { withUser } from './withUser';

class Header extends PureComponent {
  componentDidUpdate() {
    this.props.history.replace('/');
  }
  handleSignOut = () => {
    console.log('signed out');
    signOut();
  }

  render() {
    return (
      <button name='signout' value='signout' onClick={this.handleSignOut}>Sign Out</button>
    );
  }
}

export default withUser(Header);