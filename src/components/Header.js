import React, { PureComponent } from 'react';
import { signOut } from '../services/firebase';


export default class Header extends PureComponent {
  handleSignOut = () => {
    console.log('signed out')
    signOut();
    window.location = 'http://localhost:3000'
  }

  render() {
    return (
      <button name='signout' value='signout' onClick={this.handleSignOut}>Sign Out</button>
    );
  }
}