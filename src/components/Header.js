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

    const headerStyles = {
      borderBottom: '2px solid #39499B',
      width: '100%',
      margin: '0 0 2em 0'
    }
    const ulStyles = {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      margin: '0',
      padding: '0'
    }
    const h1Style = {
      fontSize: '2em'
    }
    const imgStyle = {
      width: '3em'
    }
  
    return (
      <header style={headerStyles}>
        <nav>
          <ul style={ulStyles}>
            <li><h1 style={h1Style}>Q Bot</h1></li>
            <li><Link to="/questions">Queue</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li>Welcome, {auth.currentUser.providerData[0].displayName.slice(0, space)}!</li>
            <li>
              <img src={auth.currentUser.providerData[0].photoURL} alt="avatar" style={imgStyle}/>
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
