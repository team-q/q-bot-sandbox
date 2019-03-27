import React from 'react'
import { subscribe } from '../services/firebase';

export const withUser = Component => {
  class WithUser extends React.PureComponent {
    state = {
      user: null
    }

    componentDidMount() {
      this.unsubscribe = subscribe(user => {
        this.setState({ user })
      })
    }

    componentWillUnmount() {
      this.unsubscribe && this.unsubscribe();
    }

    render() {
      if (!this.state.user) return null
      const props = { ...this.props, ...this.state }
      return <Component {...props} />
    }
  }

  return WithUser
}
