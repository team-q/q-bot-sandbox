import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { signOut, auth } from '../../services/firebase';
import { withUser } from '../withUser';
import SideBar from './SideBar';
import './Header.scss';

class Header extends PureComponent {
  state = {
    width: window.innerWidth
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  handleSignOut = () => {
    signOut();
  }

  render() {
    const profileImg = auth.currentUser.providerData[0].photoURL;
    const profileName = auth.currentUser.providerData[0].displayName;
    const profileNameSpace = profileName !== null && profileName.includes(' ');
    const space = profileNameSpace && profileName.indexOf(' ');
    const trimmedName = profileNameSpace ? profileName.slice(0, space) : 'User';
    const { width } = this.state;
    const isMobile = width <= 667;

    return (
      <header className={'headerStyles'}>
        <nav>

        {isMobile ? <SideBar pageWrapId={'page-wrap'} /> : null}

          <h1 className={'header'}>Q Bot</h1>

          {isMobile ? null : <ul className={'ulStyles'}>
              <li><Link to="/questions" className={'links'}>Queue</Link></li>
              <li><Link to="/leaderboard" className={'links'}>Leaderboard</Link></li>
              <li className={'avatarWelcome'}>
                <img src={profileImg ? profileImg : null} alt="avatar" className={'avatar'} />
                <p className={'welcome'}>
                  Welcome, {trimmedName}!
                </p>
              </li>
              <li>
                <button name='signout' value='signout'
                  onClick={this.handleSignOut} className={'logout'}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          }

        </nav>
      </header>
    );
  }
}

export default withUser(Header);
