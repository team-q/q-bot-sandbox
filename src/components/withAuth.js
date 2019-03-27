import React, { Component } from 'react';
import Delay from 'react-delay';
import { addTA } from '../actions/questions';
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
          alert('Must be authenticated!');
          this.props.history.replace('/');
        })
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
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
