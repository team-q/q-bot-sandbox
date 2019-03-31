import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../services/firebase';
import { useUser } from '../withUser';
import SideBar from './SideBar';
import './Header.scss';

// Nice job with the conditional loading!
// its probably preferable to use media queries though
export default function Header() {
  // use a hook here
  const user = useUser();
  if (!user) return null;

  const profileImg = user.photoURL;
  const profileName = user.displayName;
  const profileNameSpace = profileName !== null && profileName.includes(' ');
  const space = profileNameSpace && profileName.indexOf(' ');
  const trimmedName = profileNameSpace ? profileName.slice(0, space) : 'User';

  return (
    <header className='headerStyles'>
      <nav>

        <SideBar className='sidebar' pageWrapId='page-wrap' />

        <h1 className='header'>Q Bot</h1>

        <ul className='ulStyles'>
          <li><Link to="/questions" className='links'>Queue</Link></li>
          <li><Link to="/leaderboard" className='links'>Leaderboard</Link></li>
          <li className='avatarWelcome'>
            <img src={profileImg ? profileImg : null} alt="avatar" className='avatar' />
            <p className='welcome'>
              Welcome, {trimmedName}!
                </p>
          </li>
          <li>
            <button name='signout' value='signout'
              onClick={signOut} className='logout'
            >
              Sign Out
                </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
