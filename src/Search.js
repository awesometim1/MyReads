import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

class Search extends React.Component {

    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  state = {
    
   searchTerm : "",
    
   books : [],
    
  }
  


  onShelf(){
    BooksAPI.getAll().then((bks) => {
      	let newBooks = [];
      	let dup = false;
        this.state.books.forEach(function(book){
          	dup = false;
          	bks.forEach(function(bk){
              	if (bk.id === book.id){
                 	newBooks.push(bk); 
                  	dup = true;
                }
            })
        	if (!dup){
             	newBooks.push(book); 
            }
        

        //end foreach
        })
    this.setState({books: newBooks});

    }

    )
  }


  handleChange(event) {
    let tempTerm = event.target.value;
    
    //check if search string is empty first
    if (tempTerm.length < 1){
      this.setState({searchTerm: "", books : []})
    }
    else {
    BooksAPI.search(tempTerm, 20).then((books) => 
		{this.setState({
          	searchTerm : tempTerm,
  			books : books}); }, //end setState
                                      
		this.onShelf()) //end then
	}
  }



  render() {
    return (

		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
					{
                      this.state.books.items != null && this.state.books.items.length < 1 ? 
                     	(<h1> NO RESULTS </h1>)
                     	: 
                     	(this.state.books.map((bk) => 
						<li key={bk.id}>
						{console.log(bk.shelf)}
                        <Book shelf={bk.shelf !== null ? bk.shelf : "none"} obj={bk} changeShelf={this.props.changeShelf} url={bk.imageLinks.smallThumbnail} title={bk.title} authors={bk.authors}/>
                      	</li>)
					)}
			  </ol>
            </div>
          </div>

)
}
}

export default Search