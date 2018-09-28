import React from 'react'
import './App.css'
import Book from './Book.js'


class Shelf extends React.Component {

  render(){
    const books = this.props.books;
    return(
			<div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
      				  {books.map(book => 
						<li key={book.id}>
                        <Book key={book.id} url={book.imageLinks.smallThumbnail} title={book.title} authors={book.authors}/>
                      	</li>
						)
					  }
                    </ol>
                  </div>
                </div>
)
}
}
export default Shelf