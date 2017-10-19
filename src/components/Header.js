import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/**
 * Header.js
 *
 * This renders the header of the site, mainly just the logo which links
 * back to the homepage to conduct a new search.
 */
class Header extends Component {
  render() {
    const headerStyles = {
      background: `#000 url(${process.env.PUBLIC_URL}/images/tvs.jpg) 100% 50% no-repeat`,
      backgroundSize: '75%'
    };

    return (
      <header className="header" style={headerStyles}>
        <Link to={`${process.env.PUBLIC_URL}/`} className="header__link logo">TV-Db</Link>
      </header>
    );
  }
}

export default Header;
