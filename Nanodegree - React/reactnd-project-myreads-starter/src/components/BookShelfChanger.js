import React from 'react';

export default class BookShelfChanger extends React.Component {
    handleChange = (event) => {
        this.props.handleShelfUpdate(this.props.book, event.target.value);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.handleChange} value={this.props.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}