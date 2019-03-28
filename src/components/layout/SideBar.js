import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { signOut } from '../../services/firebase';

const styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '2.3em',
    height: '1.7em',
    right: '2.5em',
    top: '1.5em'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '1.5em',
    width: '1.5em',
    marginRight: '.7em'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    margin: '0 0 0 -2em'
  },
  bmMenu: {
    background: '#39499B',
    padding: '2.5em 1.5em 0 0',
    fontSize: '1.15em',
    marginRight: '.45em',
    marginLeft: '-.45em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0 0 0 20%'
  },
  bmItem: {
    display: 'inline-flex'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

export default class SideBar extends React.Component {
  state = {
    menuOpen: false
  };

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleSignOut = () => {
    signOut();
  }

  render() {
    return (
      <>
        <Menu styles={styles} width={ '50%' }
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <Link className="menu-item" to="/questions" 
            onClick={() => this.closeMenu()}
          >
            Queue
          </Link>
          <br/>
          <br/>
          <Link className="menu-item" to="/leaderboard" 
            onClick={() => this.closeMenu()}
          >
            Leaderboard
          </Link>
          <br/>
          <br/>
          <button name='signout' value='signout'
            onClick={this.handleSignOut} 
            className={'logout'}
          >
            Sign Out
          </button>
        </Menu>
      </>
    );
  }
}
