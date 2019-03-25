import React, { Component } from 'react';
import Delay from 'react-delay';
import firebase from 'firebase/app';

export default WrappedComponent => {
  class WithAuthentication extends Component {
    state = {
      providerData: []
    };

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ providerData: user.providerData });
        } else {
          console.info('Must be authenticated');
          this.props.history.replace('/');
        }
      });
    }

    render() {
      return this.state.providerData.length > 0 ? (
        <WrappedComponent
          {...this.props}
          providerData={this.state.providerData}
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