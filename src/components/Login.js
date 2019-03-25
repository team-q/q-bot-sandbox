
import React, { Component } from 'react';
import { subscribe } from '../services/firebase';

export default class Login extends Component {
  state = {
    provider: '',
    loading: false
  }

  componentDidUpdate() {
    subscribe(user => {
      console.log(user)
    }, this.state.provider)
  }

  componentDidMount() {
    subscribe(user => {
      if(user) {
        this.setState({ loading: true })
        this.props.history.replace('/questions');
      }
    })
  }

  handleClick = ({ target }) => {
    this.setState({ provider: target.value })
  }

  render() {
    return (
      <>
        {this.state.loading === false && <><h1>Q BOT LOGIN</h1>
        <button name='google' value='google' onClick={this.handleClick}>Google</button>
        <button name='github' value='github' onClick={this.handleClick}>GitHub</button></>}
      </>
    );
  }
 
}
