import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { subscribe, loginWithProvider } from '../../services/firebase';
import logo from '../../assets/logo.png';
import './Login.scss';

export default class Login extends Component {
  state = {
    provider: ''
  }

  componentDidUpdate() {
    this.subscribeWithLogin();
  }

  subscribeWithLogin() {
    this.unsubscribe && this.unsubscribe();
    this.unsubscribe = subscribe(user => {
      if(user) {
        this.props.history.replace('/questions');
      }
    }, () => {
      loginWithProvider(this.state.provider)
        .catch(console.log)
      })
  }

  componentDidMount() {
    this.subscribeWithLogin()
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleClick = ({ target }) => {
    this.setState({ provider: target.value })
  }

  render() {
    return (
      <>
        <main>
          <div className={'logo-div'}>
            <img src={logo} alt="logo"/>
            <h1>Q BOT</h1>
          </div>
          <br/>
          <span>Sign in with:</span>
          <br/>
          <button className={'login-btn'}
            name='google'
            value='google'
            onClick={this.handleClick}
          >
            Google
          </button>
          <button className={'login-btn'}
            name='github'
            value='github'
            onClick={this.handleClick}
          >
            GitHub
          </button>
          <br/>
          <br/>
          <Link to="/about">About Us</Link>
        </main>
      </>
    );
  }
 
}
