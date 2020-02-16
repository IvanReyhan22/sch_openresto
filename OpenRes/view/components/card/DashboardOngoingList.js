import React, { Component } from 'react'
import '../../../assets/scss/components.scss'

export default class DashboardOngoingList extends Component {
    render() {
        return (
            <div id="DashboardongoingList">
                <h4 className="title m-0">{this.props.title}</h4>
                <p className="time">{this.props.time}</p>
            </div>
        )
    }
}
