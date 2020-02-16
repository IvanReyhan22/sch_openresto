import React, { Component } from 'react'

export default class INPUTWithIcon extends Component {
    render() {
        return (
            <div id="input-icon">
                <div className="input-group">
                    <span className="input-group-addon">
                        <button type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        )
    }
}
