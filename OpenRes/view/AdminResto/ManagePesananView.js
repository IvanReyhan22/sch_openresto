import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import FoodProfileCard from '../components/card/FoodProfileCard'

import '../../assets/scss/manage-pesanan.css'

export default class ManagePesananView extends Component {
  render() {
    return (
      <div>
        
        <NavbarAdmin noSearch />

        <div id="pesanan-content">
          
          <div className="container">

            <div className="row">

              <div className="col-4">
                <div className="card mb-4 py-2 px-2">
                    <nav className="navbar justify-content-between m-0">
                      <div className="title">Semua Meja</div>
                      <i className="fa fa-search"></i>
                    </nav>
                </div>

                <FoodProfileCard
                  title={"Meja 021"}
                  status={"Tersedia"}
                  price={"15.000"}
                  code={"M021"}
                 />

                <FoodProfileCard
                  title={"Meja 021"}
                  status={"Tersedia"}
                  price={"15.000"}
                  code={"M021"}
                 />

                <FoodProfileCard
                  title={"Meja 021"}
                  status={"Tersedia"}
                  price={"15.000"}
                  code={"M021"}
                 />

              </div>

              <div className="right-container col-8">
                <div className="card py-3 px-4">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-0">Detail Pesanan</h3>
                      <p className="code">#BKS191102-001</p>
                      <a href="" className="btn btn-sm px-4">Pesanan Selesai</a>
                      <div className="desc mt-3">
                        <div className="row m-0">
                          <div className="mr-5">
                            <div className="title">TANGGAL PESANAN</div>
                            <div className="value">14 November 2019</div>
                          </div>
                          <div>
                            <div className="title">NO MEJA DIPESAN</div>
                            <div className="value">B-025</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="title">Pelanggan</div>
                      <div className="name">Crystal Smith</div>
                      <div className="address">4304 Liberty Avenue 92680 Tustin, CA VAT no: 12345678</div>
                    </div>
                  </div>

                  <table className="table table-borderless table-hover mt-4">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Menu Pesanan</th>
                        <th scope="col">Jumlah</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Total Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Burger Sedang</td>
                        <td>2</td>
                        <td>Rp15.000,00</td>
                        <td>Rp30.000,00</td>
                      </tr>
                    </tbody>
                  </table> 
                  
                </div>
              </div>
            </div>

            </div>

        </div>
      </div>
    )
  }
}
