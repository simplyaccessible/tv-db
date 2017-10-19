import React from 'react';
import PropTypes from 'prop-types';

/**
 * Annoucements.js
 *
 * This renders the ARIA live element which appears in Results.js.
 *
 * The only required prop is `message` which is the text used when announcing
 * the message to the screen reader user.
 */
class Announcements extends React.Component {
  render() {
    return (
      <div className="visuallyhidden" role="status" aria-live="polite" aria-atomic="true">
        {this.props.message}
      </div>
    );
  }
}

Announcements.PropTypes = {
  message: PropTypes.string.isRequired
};

export default Announcements;
