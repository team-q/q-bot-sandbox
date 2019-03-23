import React, { Component } from 'react';
import { subscribe, signOut } from '../services/firebase';

export default class Login extends Component {
  state = {
    provider: ''
  }

  componentDidUpdate() {
    subscribe(user => {
      console.log(user)
    }, this.state.provider)
  }

  handleClick = ({ target }) => {
    this.setState({ provider: target.value })
  }

  handleSignOut = () => {
    console.log('signed out')
    signOut();

  }

  render() {
    return (
      <>
        <button name='google' value='google' onClick={this.handleClick}>Google</button>
        <button name='github' value='github' onClick={this.handleClick}>GitHub</button>
        <button name='signout' value='signout' onClick={this.handleSignOut}>Sign Out</button>
      </>
    );
  }
 
}