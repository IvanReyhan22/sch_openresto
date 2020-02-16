import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdminResto'
import FoodProfileCard from '../components/card/FoodProfileCard'

import '../../assets/scss/manage-pesanan.css'
import Loading from '../components/Loading'

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

                {
                  this.props.state.listLoading === false
                    ?
                    this.props.state.booking.length !== 0
                      ?
                      this.props.state.booking.map((item, id) => {
                        return <div key={id} onClick={() => this.props.method.setPanel(item)}>
                          <FoodProfileCard
                            onClick={() => this.props.method.setPanel(item)}
                            title={`Meja ${item.meja[0].meja_id}`}
                            status={item.status}
                            price={item.meja[0].subtotal}
                            code={item.no_transaksi}
                          />
                        </div>
                      })
                      :
                      <div className="my-3">
                        <h4 className="text-center">Belum ada yang pesan</h4>
                      </div>
                    :
                    <Loading />

                }

              </div>

              <div className="right-container col-8">
                <div className="card py-3 px-4">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-0">Detail Pesanan</h3>
                      <p className="code">{this.props.state.selectedItem !== null ? this.props.state.selectedItem.no_transaksi : '---'}</p>
                      <button onClick={()=>this.props.method.bookingConfirm()} className="btn btn-sm px-4">Pesanan Selesai</button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button onClick={()=>this.props.method.bookingCancel()} style={{backgroundColor:'#c0392b'}} className="btn btn-sm px-4">Batalkan Pesanan</button>
                      <div className="desc mt-3">
                        <div className="row m-0">
                          <div className="mr-5">
                            <div className="title">TANGGAL PESANAN</div>
                            <div className="value">14 November 2019</div>
                          </div>
                          <div>
                            <div className="title">NO MEJA DIPESAN</div>
                            <div className="value">{this.props.state.selectedItem !== null ? this.props.state.selectedItem.meja[0].no_meja : '---'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="title">Pelanggan</div>
                      <div className="name">{this.props.state.selectedItem !== null ? this.props.state.selectedItem.user.nama : '---'}</div>
                      <div className="address">{this.props.state.selectedItem !== null ? this.props.state.selectedItem.restoran.alamat : '---'}</div>
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
                      {
                        this.props.state.selectedItem !== null
                          ?
                          this.props.state.selectedItem.menu.length !== 0
                            ?
                            this.props.state.selectedItem.menu.map((item, id) => {
                              return <tr key={id}>
                                <td>{item.id}</td>
                                <td>{item.nama}</td>
                                <td>{item.qty}</td>
                                <td>Rp {item.harga}</td>
                                <td>Rp {item.subtotal}</td>
                              </tr>
                            })
                            :
                            <div></div>
                          :
                          <div></div>
                      }
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
