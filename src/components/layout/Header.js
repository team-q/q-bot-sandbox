import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { signOut } from '../../services/firebase';
import { withUser } from '../withUser';
import SideBar from './SideBar';
import './Header.scss';
import User from '../user/User';

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
    const { width } = this.state;
    const isMobile = width <= 1000;

    return (
      <header className={'headerStyles'}>
        <nav>

          {isMobile ? <SideBar pageWrapId={'page-wrap'} /> : null}

          <h1 className={'header'}>Q Bot</h1>

          {isMobile ? null : <ul className={'ulStyles'}>
            <li><Link to="/questions" className={'links'}>Queue</Link></li>
            <li><Link to="/student-leaderboard" className={'links'}>Student Leader Board</Link></li>
            <li><Link to="/leaderboard" className={'links'}>TA Leader Board</Link></li>
            <li className={'avatarWelcome user'}>
              <User/>
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
