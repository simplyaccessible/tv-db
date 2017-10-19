import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

/**
 * Details.js
 *
 * This renders the show details "page" after clicking a show link from the
 * homepage or the results page.
 */
class Details extends Component {
  constructor() {
    super();

    // Bind the custom method(s) to the class
    this.fetchShowData = this.fetchShowData.bind(this);

    // Set the initial component state
    this.state = {
      loading: true,
      results: null
    };
  }

  componentDidMount() {

    // Update the `title` element text
    document.title = 'Show Details | TV-Db';

    // Go and get the data via `fetchShowData()` method
    this.fetchShowData();
  }

  /**
   * Fetch TV data from TVMaze API based on the `id` URL param.
   *
   * @return null
   */
  fetchShowData() {

    // Cache the `id` URL param which comes in from the router, defined
    // in App.js
    const id = this.props.match.params.id;

    // Timeout to allow sweet batman loading gif to run at least once 😎
    setTimeout(() => {

      // Use the new `fetch()` API to go and grab some data
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(data => data.json())
        .then(data => {

          // Once we have the data, set it to the `results` state property
          // and update the `loading` property
          this.setState({loading: false, results: data});

          // Update the `title` element text with the proper show name,
          // now that we have the data available
          document.title = `Show Details: ${this.state.results.name} | TV-Db`;

          // Set focus to the content container after the data has been fetched
          // Note: this happens _after_ setting the `loading` state property,
          // so the loading screen will be gone by this point
          this.container.focus();

          // Ensure the viewport returns to the top of the document window
          window.scrollTo(0, 0);
        });
    }, 750);
  }

  render() {

    // Show the loading screen only if the current state of the `loading`
    // property retirns `true`
    if (this.state.loading) {
      return (<Loader/>);
    }

    return (
      <div className="container" tabIndex="-1" aria-labelledby="pageTitle" ref={(container) => { this.container = container; }}>
        <Header/>

        <main className="main">
          <h1 id="pageTitle" className="details__title heading heading--1">{this.state.results.name}</h1>

          <div className="grid">
            <div className="grid__item">
              {/*
                If there's no image available from the API, show a placeholder
                with the show name embedded; otherwise, show the cover image
              */}
              <img src={this.state.results.image ? this.state.results.image.medium : `http://via.placeholder.com/210x295/000000/ffffff/?text=${this.state.results.name}`} alt="" className="details__image" aria-hidden="true"/>
            </div>
            <div className="grid__item">
              <h2 className="details__subtitle heading heading--2">Summary</h2>
              {/*
                Included a third-party module, `ReactHtmlParser()` in order to
                assist in parsing the HTML from the TVMaze API
              */}
              {ReactHtmlParser(this.state.results.summary)}

              <h2 className="details__subtitle heading heading--2">Details</h2>
              <table className="details__table">
                <tbody>
                  {/*
                    If the genres data exists…
                  */}
                  {this.state.results.genres
                    ? (
                      <tr>
                        <th scope="row" id="genre">Genre</th>
                        <td>
                          <ul className="details__genere-list" aria-labelledby="genre">
                            {this.state.results.genres.map((genre) => {
                              return <li key={genre}>{genre}</li>;
                            })}
                          </ul>
                        </td>
                      </tr>
                    )
                    : ''}
                  {/*
                    If the type data exists…
                  */}
                  {this.state.results.type
                    ? (
                      <tr>
                        <th scope="row">Type</th>
                        <td>
                          {this.state.results.type}
                        </td>
                      </tr>
                    )
                    : ''}
                  {/*
                    If the network data exists…
                  */}
                  {this.state.results.network
                    ? (
                      <tr>
                        <th scope="row">Network</th>
                        <td>
                          {this.state.results.network.name}, {this.state.results.network.country.name}
                        </td>
                      </tr>
                    )
                    : ''}
                  {/*
                    If the rating data exists…
                  */}
                  {this.state.results.rating
                    ? (
                      <tr>
                        <th scope="row">Rating</th>
                        <td>
                          {this.state.results.rating.average}<span aria-hidden="true">/</span><span className="visuallyhidden">out of</span>10
                        </td>
                      </tr>
                    )
                    : ''}
                </tbody>
              </table>

              <h2 className="details__subtitle heading heading--2">More Info</h2>
              <ul>
                {/*
                  Generate and output a link to IMDb for more info, if the link
                  exists in the data result set
                */}
                {this.state.results.externals.imdb
                  ? (
                    <li>
                      <a href={`http://imdb.com/title/${this.state.results.externals.imdb}/`} className="details__more-link" target="_blank" rel="nofollow">Check out {this.state.results.name} on IMDb! <span role="img" aria-label=", opens third-party website in new window">👉</span></a>
                    </li>
                  )
                  : ''}
                <li>
                  {/*
                    Generate and output a link to YouTube for more 📺
                  */}
                  <a href={`https://youtube.com/results?search_query=${this.state.results.name}`} className="details__more-link" target="_blank" rel="nofollow">Find out what YouTube has available for {this.state.results.name} <span role="img" aria-label=", opens third-party website in new window">📺</span></a>
                </li>
              </ul>
            </div>
          </div>
        </main>

        <Footer/>
      </div>
    );
  }
}

export default Details;
