import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css'
import * as BooksAPI from "./BooksAPI";

import ShelvesPage from "./components/ShelvesPage";
import SearchPage from "./components/SearchPage";


class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.updateBooks();
    }

    updateBooks = () => {
        BooksAPI.getAll().then(books => this.setState({books: books}));
    }

    handleShelfUpdate = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() =>
            this.updateBooks()
        );
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/search">
                            <SearchPage books={this.state.books} handleShelfUpdate={this.handleShelfUpdate}/>
                        </Route>
                        <Route path="/">
                            <ShelvesPage books={this.state.books} handleShelfUpdate={this.handleShelfUpdate}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default BooksApp
