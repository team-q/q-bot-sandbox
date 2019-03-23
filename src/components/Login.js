
import React, { Component } from 'react';
import { subscribe, redirect } from '../services/firebase';

export default class Login extends Component {
  state = {
    provider: ''
  }

  componentDidUpdate() {
    subscribe(user => {
      console.log(user)
    }, this.state.provider)
  }

  componentDidMount() {
    subscribe(user => {
      if(user) {
        redirect();
      }
    })
  }

  handleClick = ({ target }) => {
    this.setState({ provider: target.value })
  }

  render() {
    return (
      <>
        <h1>Q BOT LOGIN</h1>
        <button name='google' value='google' onClick={this.handleClick}>Google</button>
        <button name='github' value='github' onClick={this.handleClick}>GitHub</button>
      </>
    );
  }
 
}
