import React from "react";
import "./App.css";
import Book from "./Book.js";

const Shelf = (props) => {
  
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
			{console.log(props.books)}
			{props.books.map(book => (
              <li key={book.id}>
                <Book
                  shelf={book.shelf}
                  obj={book}
                  changeShelf={props.changeShelf}
                  url={book.imageLinks.smallThumbnail !== null ? book.imageLinks.smallThumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"}
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
export default Shelf;

