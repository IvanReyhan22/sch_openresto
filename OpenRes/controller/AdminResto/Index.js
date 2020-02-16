import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import '../../assets/admin/style.css';
import Navbar from '../../view/components/NavbarAdminResto';
import { AuthKey } from '../../system/Collection';

export default function Index({ match }) {

    if(localStorage.getItem(AuthKey.LOGIN_DATA)){

    return <Router>

    <div id="admin-routes">

      <div className="container-scroller">

          <Navbar />

          <div className="container-fluid page-body-wrapper w-100 px-0">

              <div className="main-panel bg-danger">

                  <div className="content-wrapper">

                      <Switch>

                          <Route exact path={`${match.path}`} component={Dashboard} />

                      </Switch>

                  </div>

              </div>

          </div>

      </div>

    </div>

    </Router>
    }
    else{ <div>
        {this.props.push('')}
        {this.props.push('login')}
        </div>
        
    }

}
