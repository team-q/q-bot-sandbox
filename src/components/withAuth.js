import React, { Component } from 'react';
import Delay from 'react-delay';
import firebase from 'firebase/app';
import { addTA } from '../actions/questions';

export const withAuth = WrappedComponent => {
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

    handleClick = (id) => {
      const ta = this.state.providerData[0].displayName;
      return addTA(ta, id);
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
