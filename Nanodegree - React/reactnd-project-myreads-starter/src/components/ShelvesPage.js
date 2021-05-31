import React from 'react';
import {Link} from "react-router-dom";

import BookShelf from "./BookShelf";


export default class ShelvesPage extends React.Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading"
                                   books={this.props.books?.filter(book => book.shelf === "currentlyReading")}
                                   handleShelfUpdate={this.props.handleShelfUpdate}/>
                        <BookShelf title="Want to Read"
                                   books={this.props.books?.filter(book => book.shelf === "wantToRead")}
                                   handleShelfUpdate={this.props.handleShelfUpdate}/>
                        <BookShelf title="Read"
                                   books={this.props.books?.filter(book => book.shelf === "read")}
                                   handleShelfUpdate={this.props.handleShelfUpdate}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}