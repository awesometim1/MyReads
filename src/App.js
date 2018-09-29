import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf.js'
import { Route, Link} from 'react-router-dom'
import Search from './Search.js'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
  }
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

  changeShelf( bookToChange, shelf , initShelf) {

      	BooksAPI.update(bookToChange, shelf).then(() => {
     	bookToChange.shelf = shelf;
          
              	//DELETION
      	if (initShelf.includes('c')){
        this.setState({current : this.state.current.filter(bk => bk.id !== bookToChange.id)}); 
    	}
		else if (initShelf.includes('w')){
        this.setState({want : this.state.want.filter(bk => bk.id !== bookToChange.id)});
        }
		else {
        this.setState({read : this.state.read.filter(bk => bk.id !== bookToChange.id)});
        }


		//BOOKSHELF CHANGE 
        if (shelf.includes('c')){
        this.setState({current : this.state.current.concat([bookToChange])}); 
    	}
		else if (shelf.includes('w')){
        this.setState({want : this.state.want.concat([bookToChange])}); 
        }
		else {
        this.setState({read : this.state.read.concat([bookToChange])});   
        }
		})
    	  


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
                <Shelf changeShelf={this.changeShelf} id="current" books={this.state.current}/>
                <Shelf changeShelf={this.changeShelf} id="want" books={this.state.want}/>
                <Shelf changeShelf={this.changeShelf} id="read" books={this.state.read}/>
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
          <Search books={this.state.books}/>
        )} />
          
      </div>
    )
  }
}

export default BooksApp
