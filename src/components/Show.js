import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

/**
 * Show.js
 *
 * This renders the indavidual show links which appear on the homepage and
 * the search results page.
 *
 * The only required prop is the `showId` which is used to fetch the show
 * data from the TVMaze API.
 */
class Show extends Component {
  constructor() {
    super();

    // Set the initial component state
    this.state = {
      loading: true,
      results: null
    };

    // Bind the custom method(s) to the class
    this.fetchShowData = this.fetchShowData.bind(this);
  }

  componentDidMount() {

    // Go and get the data via `fetchShowData()` method
    this.fetchShowData();
  }

  /**
   * Fetch TV data from TVMaze API based on the `showId` prop.
   *
   * @return null
   */
  fetchShowData() {

    // TV show `id` prop which is supplied from the parent component
    const id = this.props.showId;

    // Use the new `fetch()` API to go and grab some data
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(data => data.json())
      .then(data => {

        // Once we have the data, set it to the `results` state property
        // and update the `loading` property
        this.setState({loading: false, results: data});
      });
  }

  render() {
    if (this.state.loading) {

      // Don't render anything for indiavidual show links
      return null;
    }

    return (

      // Return a <Link/> which takes advantage of React's virtual DOM, but
      // renders an accessible `<a>` element.
      <Link to={`${process.env.PUBLIC_URL}/show/${this.state.results.id}`} className="show__link">
        {/*
          If there's no image available from the API, show a placeholder
          with the show name embedded; otherwise, show the cover image
        */}
        <img src={this.state.results.image ? this.state.results.image.medium : `http://via.placeholder.com/210x295/000000/ffffff/?text=${this.state.results.name}`} alt={this.state.results.name} className="show__image" />
      </Link>
    );
  }
}

Show.PropTypes = {
  showId: PropTypes.string.isRequired
};

export default Show;
