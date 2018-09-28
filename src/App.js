import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import { Route, Link} from 'react-router-dom'
import Search from './Search.js'

class BooksApp extends React.Component {

  //state with list of all books, and a list corresponding to each section of bookshelf
  state = {
   
    allBooks : [],
    
    current : [],
    
    want : [],
    
    read : [],
    
  };

//Put all of the books in the state and filter according to current shelf.
  componentDidMount(){
    
    BooksAPI.getAll().then(allBooks => {this.setState(
      {allBooks,
       current : allBooks.filter((bk) => bk.shelf === "currentlyReading"),
       want : allBooks.filter((bk) => bk.shelf === "wantToRead"),
       read : allBooks.filter((bk) => bk.shelf === "read"),
	   } 
       );});

  }


  render() {
    return (
      <div className="app">
       
       {/*BOOKSHELF ROUTE
       */}
       <Route exact path='/' render={() => (
    		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf id="current" books={this.state.current}/>
                <Shelf id="want" books={this.state.want}/>
                <Shelf id="read" books={this.state.read}/>
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
		<Route path='/search' render={() => (
          <Search userBooks={this.state.books}/>
        )} />
          
      </div>
    )
  }
}

export default BooksApp
