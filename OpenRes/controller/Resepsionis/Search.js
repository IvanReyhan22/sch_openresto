import React, { Component } from 'react'
import SearchView from '../../view/Resepsionis/SearchView'

export default class Search extends Component {

    constructor(props) {

        super(props)

        this.state = {

        }

        this.method = {
            goToPage: this.goToPage.bind(this)
        }
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }


    render() {
        return <SearchView
            state={this.state}
            method={this.method} />
    }
}
