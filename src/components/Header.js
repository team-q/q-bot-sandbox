import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { signOut, auth } from '../services/firebase';
import { withUser } from './withUser';
import './Header.css';

class Header extends PureComponent {
  componentDidUpdate() {
    this.props.history.replace('/');
  }
  
  handleSignOut = () => {
    signOut();
  }

  render() {
    const space = auth.currentUser.providerData[0].displayName.indexOf(' ');
  
    return (
      <header className={'headerStyles'}>
        <nav>
          <ul className={'ulStyles'}>
            <li><h1 className={'header'}>Q Bot</h1></li>
            <li><Link to="/questions">Queue</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li className={'avatarWelcome'}>
              <img src={auth.currentUser.providerData[0].photoURL} alt="avatar" className={'avatar'} />
              <p className={'welcome'}>Welcome, {auth.currentUser.providerData[0].displayName.slice(0, space)}!</p>
            </li>
            <li>
              <button name='signout' value='signout'
                onClick={this.handleSignOut} className={'logout'}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default withUser(Header);
