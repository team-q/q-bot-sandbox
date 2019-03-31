import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { signOut } from '../../services/firebase';
import './SideBar.scss';

export default function SideBar({ className }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={className}>
      <Menu
        width={'50%'}
        isOpen={menuOpen}
        onStateChange={() => setMenuOpen(!menuOpen)}
      >
        <h1 className={'sidebarTitle'}>Q Bot</h1>
        <Link className={'menu-item'} to='/questions'
          onClick={() => setMenuOpen(false)}
        >
          Queue
        </Link>
        <br />
        <br />
        <Link className={'menu-item'} to='/leaderboard'
          onClick={() => setMenuOpen(false)}
        >
          Leaderboard
        </Link>
        <br />
        <br />
        <button name='signout' value='signout'
          onClick={signOut}
          className={'logout'}
        >
          Sign Out
        </button>
      </Menu>
    </div>
  );
}
