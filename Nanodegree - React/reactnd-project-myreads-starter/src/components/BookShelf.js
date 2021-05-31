import React from 'react';

import Book from "./Book";


export default class BookShelf extends React.Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books?.map(book =>
                            book.imageLinks !== undefined &&
                            <li key={book.id}>
                                <Book reference={book} title={book.title} author={book.author}
                                      shelf={book.shelf} style={{
                                    backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                                }} handleShelfUpdate={this.props.handleShelfUpdate}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}