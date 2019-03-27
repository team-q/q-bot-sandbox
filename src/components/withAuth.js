import React, { Component } from 'react';
import Delay from 'react-delay';
import { subscribe } from '../services/firebase';

export const withAuth = WrappedComponent => {
  class WithAuthentication extends Component {
    state = {
      providerData: []
    };

    componentDidMount() {
      this.unsubscribe = subscribe(user => {
        this.setState({ providerData: user.providerData });
      }, () => {
          this.props.history.replace('/');
        })
    }

    

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      return this.state.providerData.length > 0 ? (
        <WrappedComponent
          {...this.props} 
          providerData={this.state.providerData}
          handleClick={this.handleClick}
        />
      ) : (
        <Delay wait={250}>
          <p>Loading...</p>
        </Delay>
      );
    }
  }

  return WithAuthentication;
};
