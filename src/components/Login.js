
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
        console.log(user)
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
        <button name='google' value='google' onClick={this.handleClick}>Google</button>
        <button name='github' value='github' onClick={this.handleClick}>GitHub</button>
      </>
    );
  }
 
}
