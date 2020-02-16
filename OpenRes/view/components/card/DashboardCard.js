import React, { Component } from 'react'
import '../../../assets/scss/components.css'

export default class DashboardCard extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="card-body">
                    <div className="title">{this.props.title}</div>
                    <div className="row m-0 p-0 w-100"> 
                        <h3 className="value">{this.props.value}</h3>&nbsp; 
                        <p className="type">{this.props.type}</p>
                    </div>
                </div>
            </div>
        )
    }
}
