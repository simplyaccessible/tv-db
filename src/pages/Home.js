import React, {Component} from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Show from '../components/Show';

/**
 * Home.js
 *
 * This renders the home "page" when first launching the app.
 */
class Home extends Component {
  constructor() {
    super();

    // An array of show `id`s which is used to populate the homepage
    this.watching = [526, 587, 431, 82, 73, 83, 60, 13417, 120];
  }

  componentDidMount() {

    // Update the `title` element text
    document.title = 'TV-Db';

    // Set focus to the content container
    this.container.focus();

    // Ensure the viewport returns to the top of the document window
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container" tabIndex="-1" aria-labelledby="pageTitle" ref={(container) => { this.container = container; }}>
        <Header/>
        <main className="main">
          <h1 id="pageTitle" className="heading heading--1 home__title center">Search <span className="logo">TV-Db</span> for your favourite TV shows!</h1>
          <Search history={this.props.history} />
          <h2 className="heading heading--2 center">Check out what we're watching!</h2>
          {/*
            Iterate over the `watching` array and output show links in a list
            via `<Show/>` component, passing `showId` prop
          */}
          <ul className="show__list">
            {this.watching.map((show) => {
              return <li className="show__list-item" key={show}><Show showId={show}/></li>;
            })}
          </ul>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default Home;
