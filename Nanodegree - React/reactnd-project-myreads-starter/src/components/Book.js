import React from 'react';

import BookShelfChanger from "./BookShelfChanger";


export default class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={this.props.style}/>
                    <BookShelfChanger book={this.props.reference} shelf={this.props.shelf}
                                      handleShelfUpdate={this.props.handleShelfUpdate}/>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.title}</div>
            </div>
        )
    }
}