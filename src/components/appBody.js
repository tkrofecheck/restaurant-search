import React, { Component } from 'react';
import SearchForm from './searchForm';

export default class AppBody extends Component {
    render() {
        return (
            <div className="app-body">
                <SearchForm />
            </div>
        );
    }
}