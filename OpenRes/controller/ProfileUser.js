import React, { Component } from 'react'

import ProfileView from '../view/general/ProfileView'

export default class ProfileUser extends Component {

    constructor(props) {

        super(props)

        this.state = {

        }

        this.method = {
            goToPage: this.goToPage.bind(this),
            goBack: this.goBack.bind(this)
        }
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return <ProfileView />
    }
}
