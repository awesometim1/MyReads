import React from "react";
import "./App.css";
import Book from "./Book.js";

class Shelf extends React.Component {
  render() {
    const books = this.props.books;
    const cat = this.props.id;
    let catName = "";
    if (cat.includes("c")) {
      catName = "Currently Reading";
    } else if (cat.includes("w")) {
      catName = "Want To Read";
    } else {
      catName = "Read";
    }
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{catName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  shelf={book.shelf}
                  obj={book}
                  changeShelf={this.props.changeShelf}
                  url={book.imageLinks.smallThumbnail}
                  title={book.title}
                  authors={book.authors}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Shelf;

