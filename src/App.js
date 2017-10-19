import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import Details from './pages/Details';
import './App.css';

/**
 * Home.js
 *
 * This renders the primary App container. Also handles all app routing.
 */
class App extends Component {
  constructor() {
    super();

    // Google Fonts
    const WebFont = require('webfontloader');

    WebFont.load({
      google: {
        families: ['Erica One', 'Open Sans:300,400,700']
      }
    });

    // Bind the custom method(s) to the class
    this.keyboardFocus = this.keyboardFocus.bind(this);
    this.mouseFocus = this.mouseFocus.bind(this);

    // Show focus styles on keyboard events only 😎
    // https://codepen.io/svinkle/pen/zzrORW
    document.addEventListener('keyup', this.keyboardFocus);
    document.addEventListener('mousedown', this.mouseFocus);
  }

  /**
   * Add the focus class to the container if the keyboard event is an
   * element within the container.
   *
   * @param {Object} e Keyboard event object
   * @return null
   */
  keyboardFocus(e) {
    if (this.app.contains(e.target)) {
      this.app.classList.add('app--has-focus');
    } else {
      this.app.classList.remove('app--has-focus');
    }
  }

  /**
   * Remove the focus class on mouse click.
   *
   * @param {Object} e Mouse event object
   * @return null
   */
  mouseFocus(e) {
    if (this.app.contains(e.target)) {
      this.app.classList.remove('app--has-focus');
    }
  }

  render() {
    return (
      <div className="app" ref={(app) => { this.app = app; }}>
        <Route basename={'/td-db/'} render={({location}) => (
          <Switch key={location.key} location={location}>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} key={location.key}/>
            <Route path={`${process.env.PUBLIC_URL}/results/:q`} component={Results} key={location.key}/>
            <Route path={`${process.env.PUBLIC_URL}/show/:id`} component={Details} key={location.key}/>
          </Switch>
        )}/>
      </div>
    );
  }
}

export default App;
