import React, { Component } from 'react'
import { ICON } from '../../../assets/images'

export default class FasilitasCard extends Component {
    render() {
        return (
            <div id="fasilitas-card">
                <img src={this.props.image} className="big-icon" />
                <p>{this.props.title}</p>
            </div>
        )
    }
}
