import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../AdminResto/Dashboard';

import '../../assets/admin/style.css';
import ManageMenu from '../AdminResto/ManageMenu'
import ManageMeja from '../AdminResto/ManageMeja'
import ManagePesanan from '../AdminResto/ManagePesanan'
import ManageMejaEdit from '../AdminResto/ManageMejaEdit';
import { AuthKey } from '../../system/Collection';
import ManageMenuEdit from '../AdminResto/ManageMenuEdit';

export default function Index({ match, ...props }) {

  if (localStorage.getItem(AuthKey.LOGIN_DATA)) {

    return <Router>

      <div id="admin-restauran">

        <div className="container-scroller">

          <Switch>

            <Route exact path={`${match.path}`} component={Dashboard} />
            <Route exact path={`${match.path}/dashboard`} component={Dashboard} />

            <Route exact path={`${match.path}/manage-menu`} component={ManageMenu} />
            <Route path={`${match.path}/manage-menu/edit/`} component={ManageMenuEdit} />

            <Route exact path={`${match.path}/manage-meja`} component={ManageMeja} />
            <Route path={`${match.path}/manage-meja/edit/`} component={ManageMejaEdit} />

            <Route exact path={`${match.path}/manage-pesanan`} component={ManagePesanan} />

          </Switch>

        </div>

      </div>

    </Router>

  }
  else {
    return <div>
      Loading...
        {props.history.push('')}
      {props.history.push('login')}
    </div>
  }

}
