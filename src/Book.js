import React from 'react'
import './App.css'

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.shelfChange = this.shelfChange.bind(this);
  }
 
  state = {
  	shelf : ""
  }

  componentDidMount(){
   	this.setState({shelf: this.props.shelf});
  }

  shelfChange(event) {
	this.setState({shelf : event.target.value});
    this.props.changeShelf(this.props.obj, event.target.value)
  }
	
  render() {
    return (
     <div className="book">
          <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
                    <div className="book-shelf-changer">
                         <select value={ this.state.shelf || 'none'} onChange={this.shelfChange}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                         </select>
                   </div>
               </div>
              <div className="book-title">{this.props.title}</div>
              <div className="book-authors">{this.props.authors}</div>
         </div>
      
      
    )
  }
}

export default Book