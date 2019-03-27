import React, { PureComponent } from 'react';
import { signOut } from '../services/firebase';
import { withUser } from './withUser';
import './Header.css';

class Header extends PureComponent {
  componentDidUpdate() {
    this.props.history.replace('/');
  }
  handleSignOut = () => {
    signOut();
  }

  render() {
    return (
      <>
        <h1 className={'queueBot'}>Queue Bot</h1>
        <button name='signout' value='signout' onClick={this.handleSignOut} className={'logout'}>Sign Out</button>
      </>
    );
  }
}

export default withUser(Header);
