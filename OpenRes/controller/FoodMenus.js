import React, { Component } from 'react'
import FoodMenusView from '../view/general/FoodMenusView'

export default class FoodMenus extends Component {

    
    constructor(props) {

        super(props)

        this.state = {

        }

        this.method= {
            goToPage : this.goToPage.bind(this),
            goBack: this.goBack.bind(this)
        }
    }

    goToPage = (request) => {
        this.props.history.push(`/${request}`);
    }

    goBack= () => {
        this.props.history.goBack();
    }
    
    render() {
        return <FoodMenusView/>
    }
}
