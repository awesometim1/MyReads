import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./Shelf.js";
import { Route, Link } from "react-router-dom";
import Search from "./Search.js";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }
  //state with list of all books, and a list corresponding to each section of bookshelf
  state = {
    allBooks: []
  };

  //Put all of the books in the state and filter according to current shelf.
  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
        allBooks: allBooks
      });
    });
  }

  changeShelf(bookToChange, shelf) {
    BooksAPI.update(bookToChange, shelf).then(() => {
      bookToChange.shelf = shelf;

      let findBook = this.state.allBooks.filter(
        bk => bk.id === bookToChange.id
      );

      if (findBook.length < 1) {
        this.setState({ allBooks: this.state.allBooks.concat([bookToChange]) });
      } else {
        this.setState({
          allBooks: this.state.allBooks
            .filter(bk => bk.id !== bookToChange.id)
            .concat([bookToChange])
        });
      }
    });
  }

  render() {
    return (
      <div className="app">
        {/*BOOKSHELF ROUTE
       */}
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf
                    changeShelf={this.changeShelf}
                    id="current"
                    books={this.state.allBooks.filter(
                      bk => bk.shelf === "currentlyReading"
                    )}
                    title="Currently Reading"
                  />
                  <Shelf
                    changeShelf={this.changeShelf}
                    id="want"
                    books={this.state.allBooks.filter(
                      bk => bk.shelf === "wantToRead"
                    )}
                    title="Want to read"
                  />
                  <Shelf
                    changeShelf={this.changeShelf}
                    id="read"
                    books={this.state.allBooks.filter(
                      bk => bk.shelf === "read"
                    )}
                    title="Read"
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />

        {/*SEARCH ROUTE
       */}
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.allBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

