import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
// import { AuthKey } from '../../../OpenRes/system/Collection';

/**
 * IMPORT CSS
 */
import 'react-toastify/dist/ReactToastify.css';
import '../../../OpenRes/assets/scss/style.css';
import '../../../OpenRes/assets/scss/components.css';

/**
 * IMPORT SCREEN
 */
import FilterPlan from '../../../OpenRes/controller/FilterPlan';
import Login from '../../../OpenRes/controller/Auth/Login';
import Register from '../../../OpenRes/controller/Auth/Register';
import ListRestaurant from '../../../OpenRes/controller/ListRestaurant';
import FoodMenus from '../../../OpenRes/view/general/FoodMenus';
import Checkout from '../../../OpenRes/controller/Checkout';
import Restaurant from '../../../OpenRes/controller/RestaurantScreen';

import ReceptionistSearch from '../../../OpenRes/controller/ReceptionistSearch';
import ReceptionistResult from '../../../OpenRes/controller/ReceptionistResult';
import Admin from '../../../OpenRes/controller/Admin/Index';
import Profile from '../../../OpenRes/controller/Profile'
import Dashboard from '../../../OpenRes/controller/Admin/Dashboard';

import ManageMenu from '../../../OpenRes/controller/AdminResto/ManageMenu';
import ManageMeja from '../../../OpenRes/controller/AdminResto/ManageMeja';
import ManagePesanan from '../../../OpenRes/controller/AdminResto/ManagePesanan';

import ScrollToTop from '../../../OpenRes/system/ScrollTop'

class App extends Component {

    render() {

        return <div className="w-100 h-100">

            <Router >

                <Switch>

                    {/* General */}
                    <Route exact path='/' component={FilterPlan} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/search' component={FilterPlan} />
                    <Route path='/home' component={ListRestaurant} />
                    <Route path='/filter_plan' component={FilterPlan} />
                    <Route path='/list-restaurant' component={ListRestaurant} />
                    <Route path='/restaurant/:id' component={Restaurant} />
                    <Route path='/menu/:id' component={FoodMenus} />
                    <Route path='/checkout' component={Checkout} />

                    {/* RECEPTIONIST RESTAURANT */}
                    <Route path='/receptionist' component={ReceptionistSearch} />
                    <Route path='/receptionist-result' component={ReceptionistResult} />

                    <Route path='/profile' component={Profile} />

                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/manage-pesanan' component={ManagePesanan} />

                    <Route exact path='/manage-meja' component={ManageMeja} />
                    <Route path='/manage-meja/edit' component={ManageMeja} />

                    <Route path='/admin' component={Admin} />

                    <Route path='/r' component={Admin} />

                    <Route component={Login} />

                    <Route path='/admin' component={Admin} />
                    <Route path='/r' component={Admin} />
                    <Route component={Login} />

                </Switch>

            </Router>

            {/* TOAST */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable
                pauseOnHover={false} />

        </div>

    }
}

/**
 * Render App in div with id of 'app'   
 * resources/views/app.blade.php
 */
if (document.getElementById('app')) {
    ReactDOM.render(< App />, document.getElementById('app'))
}