import React, { Component } from 'react'

import '../../assets/scss/dashboard.css'
import DashboardCard from '../components/card/DashboardCard'
import DashboardCardList from '../components/card/DashboardCardList'
import DashboardListTransaction from '../components/card/DashboardListTransaction'
import DashboardOngoingList from '../components/card/DashboardOngoingList'
import NavbarAdmin from '../components/NavbarAdminResto'

export default class DashboardView extends Component {
  render() {
    return (
      <div>
        <NavbarAdmin />

        <div id="dashboard-content">

          <div className="container">

            <div className="row">

              {/* LEFT SIDE */}
              <div className="left-container col-lg-8 col-md-12 col-sm-12">

                  {/* SECTION 1 */}
                  <div className="wrapper mb-3">
                    <div className="card">
                      <div className="card-body p-4">
                        <div className="navbar content-justify-between">
                          <div className="desc">
                            <h2 className="name p-0 m-0">{this.props.state.nama_res}</h2>
                            <p className="restaurant">{this.props.state.alamat_res}</p>
                          </div>
                          <div className="detail">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2 */}
                  <div className="wrapper">
                    <div className="row m-0">

                      <DashboardCard
                        className={"card col mb-3 mr-3"}
                        title={"Jumlah Menu"}
                        value={"12"}
                        type={"Menu"} />

                      <DashboardCard
                        className={"card col mb-3 mr-3"}
                        title={"Jumlah Meja"}
                        value={"33"}
                        type={"Meja"} />

                      <DashboardCard
                        className={"card col mb-3"}
                        title={"Jumlah Pesanan"}
                        value={"230"}
                        type={"Pesanan"} />

                    </div>
                  </div>

                  {/* SECTION 3 */}
                  <div className="wrapper mb-3">
                    <div className="row m-0">
                      <div className="col-4 p-0 mr-3">
                        <div className="card">
                          <div className="card-body">

                            <div className="header">
                              <h3 className="mb-3">On going</h3>
                            </div>

                            <div className="content">

                              <DashboardOngoingList
                                title={"Meja 001"}
                                time={"08.00 - 10.00"} />
                                
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col p-0">
                        <div className="card mb-3">
                          <div className="card-body">
                            <h4 className="mb-0">Menu Terlaris</h4>
                          </div>
                        </div>

                        <DashboardCardList
                          title={"Burger Jumbo"}
                          status={"Tersedia"}
                          price={"75.000"}
                          order={"501"} />

                        <DashboardCardList
                          title={"Soda"}
                          status={"Tersedia"}
                          price={"8.000"}
                          order={"304"} />

                      </div>
                    </div>
                  </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="left-container col-lg-4 col-md-12 col-sm-12">
                  <div className="card">
                      <div className="card-body">
                          <div className="head mb-3">
                              <h3 className="m-0">Transaksi Terakhir</h3>
                              <hr className="mt-2 mb-4"></hr>
                          </div>
                          <div className="content">

                            <DashboardListTransaction 
                              name={"Crystal Smith"}
                              date={"17.12.2019 10.34"}
                              price={"215.000"} />

                            <DashboardListTransaction 
                              name={"Jennie Kyler"}
                              date={"17.11.2019 10.34"}
                              price={"295.000"} />

                            <DashboardListTransaction 
                              name={"Crystal Smith"}
                              date={"17.12.2019 10.34"}
                              price={"215.000"} />

                            <DashboardListTransaction 
                              name={"Jennie Kyler"}
                              date={"17.11.2019 10.34"}
                              price={"295.000"} />

                            <DashboardListTransaction 
                              name={"Crystal Smith"}
                              date={"17.12.2019 10.34"}
                              price={"215.000"} />

                            <DashboardListTransaction 
                              name={"Jennie Kyler"}
                              date={"17.11.2019 10.34"}
                              price={"295.000"} />

                            <DashboardListTransaction 
                              name={"Crystal Smith"}
                              date={"17.12.2019 10.34"}
                              price={"215.000"} />

                            <DashboardListTransaction 
                              name={"Jennie Kyler"}
                              date={"17.11.2019 10.34"}
                              price={"295.000"} />

                            <DashboardListTransaction 
                              name={"Crystal Smith"}
                              date={"17.12.2019 10.34"}
                              price={"215.000"} />

                            <DashboardListTransaction 
                              name={"Jennie Kyler"}
                              date={"17.11.2019 10.34"}
                              price={"295.000"} />

                          </div>
                      </div>
                  </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}
