import React, { Component } from 'react';
import Delay from 'react-delay';
import firebase from 'firebase/app';

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

    onClick = ({ target }) => {
      firebase.firestore().collection('channel').doc(target.value).update({ TA: this.state.providerData[0].displayName })
      alert('TA added');
    }

    render() {
      return this.state.providerData.length > 0 ? (
        <WrappedComponent
          {...this.props}
          providerData={this.state.providerData}
          onClick={this.onClick}
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