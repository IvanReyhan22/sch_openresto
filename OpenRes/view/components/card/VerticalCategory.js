import React, { Component } from 'react'

export default class HorizontalCategory extends Component {
    render() {
        return (
            <div id={ this.props.highlight === undefined ? "vertical-category-light" : "vertical-category"} className="mb-2 mb-md-0" style={{cursor:'pointer'}}>
                <div className="circle">
                    <img src={this.props.src} alt="" />
                </div>
                <p>
                    {this.props.title === undefined ? "---" : this.props.title}
                </p>
            </div>
        )
    }
}
