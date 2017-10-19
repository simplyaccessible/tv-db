import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Search.js
 *
 * This renders the search form which appears on the homepage, Home.js.
 *
 * The only required prop is `history` which is used to load the results
 * page by pushing the URL to the router object.
 */
class Search extends Component {
  constructor() {
    super();

    // Bind the custom method(s) to the class
    this.clearError = this.clearError.bind(this);
    this.floatLabel = this.floatLabel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Clear the error text on `input` keyup event, if the text is currently
   * active, that is.
   *
   * @return null
   */
  clearError() {
    if (this.error.classList.contains('search__error-text--active')) {
      this.error.classList.remove('search__error-text--active');
    }
  }

  /**
   * Float the `label` when the correct conditions are met.
   * https://codepen.io/svinkle/pen/NvazGb 😎
   *
   * @param  {Object} e Event object
   * @return null
   */
  floatLabel(e) {
    const eventType = e.type;
    const textInput = e.target;

    // On `keyup`, if there's text in the input, show the label
    if (eventType === 'keyup' && textInput.value.length !== 0) {
      this.labelText.classList.add('search__label-text--floating');
    }

    // On `blur`, if there's no text in the input, hide the label
    if (eventType === 'blur' && textInput.value.length === 0) {
      this.labelText.classList.remove('search__label-text--floating');
    }
  }

  /**
   * Called when the search form is submited. Doens't do much except load
   * the Results.js "page" with the specified search query.
   *
   * @return null
   */
  handleSubmit(e) {

    // Prevent the default action
    e.preventDefault();

    // A bit of form validation
    if (!this.q.value) {

      // Show the error message if nothing's been entered
      this.error.classList.add('search__error-text--active');

      // Send focus back to the `input`
      this.q.focus();
    } else {

      // Set the page URL by pushing to the router history array
      this.props.history.push(`${process.env.PUBLIC_URL}/results/${this.q.value}`);
    }
  }

  render() {
    return (
      <form action="/" method="GET" className="search" role="search" onSubmit={this.handleSubmit}>
        <label htmlFor="q" className="search__label">
          <span className="search__label-text" ref={(labelText) => { this.labelText = labelText; }}>Your favourite show…</span>
          {/*
            Need to create a ref to the `input` element here in order to
            read its current value within the `handleSubmit()` method
          */}
          <input type="search" name="q" id="q" placeholder="Your favourite show…" autoComplete="off" className="search__input" onKeyDown={this.clearError} onKeyUp={this.floatLabel} onBlur={this.floatLabel} ref={(q) => { this.q = q; }}/>
          <span className="search__error-text" ref={(error) => { this.error = error; }}>No favourite show? You must have at least one! Try again. <span role="img" aria-label="" aria-hidden="true">🙂</span></span>
        </label>
        <button className="btn search__btn">Make&nbsp;It&nbsp;So&nbsp;<span role="img" aria-label="" aria-hidden="true">👉</span></button>
      </form>
    );
  }
}

Search.PropTypes = {
  history: PropTypes.object.isRequired
};

export default Search;
