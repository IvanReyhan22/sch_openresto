import React, { Component } from 'react'

export default class PrimaryBtn extends Component {
    render() {
        return (
            <div id="primary-button">
                <button className={this.props.shadowed === undefined ? "" : "shadow"} onClick={(e)=> this.props.onClick(e)}>
                    {this.props.title === undefined ? "OK" : this.props.title}
                </button>
            </div>
        )
    }
}
