import React, {Component} from 'react';

/**
 * Footer.js
 *
 * This renders the footer of the site, including static links out to other
 * relavent resources.
 */
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <p><span className="logo">TV-Db</span> &copy; <a href="https://simplyaccessible.com/" target="_blank" rel="noopener noreferrer">Simply Accessible Inc</a>.<br/>This demo app is a component to the article, <a href="https://simplyaccessible.com/article/react-a11y/" target="_blank" rel="noopener noreferrer">Creating Accessible React Apps</a>. View the <a href="https://github.com/simplyaccessible/tv-db" target="_blank" rel="noopener noreferrer">source on GitHub</a>. <br/>Data, images, and content &copy; <a href="https://tvmaze.com/api" target="_blank" rel="noopener noreferrer">TVMaze.com</a>.</p>
      </footer>
    );
  }
}

export default Footer;
