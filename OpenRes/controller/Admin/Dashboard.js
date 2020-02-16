import React, { Component } from 'react'
import DashboardView from '../../view/Admin/DashboardView'
import NavbarAdmin from '../../view/components/NavbarAdminResto'

export default class Dashboard extends Component {
    render() {
        return <div>
            <NavbarAdmin />
            <DashboardView />
        </div>
    }
}
