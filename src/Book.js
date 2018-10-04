import React from "react";
import "./App.css";

const Book = props => {
  const shelfChange = event => {
    props.changeShelf(props.obj, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.url != null && props.url})`
          }}
        />
        <div className="book-shelf-changer">
          <select value={props.shelf || "none"} onChange={shelfChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title != null && props.title}</div>
      <div className="book-authors">
        {props.authors != null &&
          props.authors.map(author => <div key={author}>{author}</div>)}
      </div>
    </div>
  );
};

export default Book;

