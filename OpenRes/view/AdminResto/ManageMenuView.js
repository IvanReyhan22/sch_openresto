import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdminResto'
import FoodProfileCard from '../components/card/FoodProfileCard'
import Loading from '../components/Loading'

import '../../assets/scss/receptionist-list.css'

export default class ManageMejaView extends Component {
  render() {
    return (
      <div>
        <NavbarAdmin noSearch />

        <div id="receptionist-list">

          <div className="container">

            <div className="row">

              {/* LIST MENU */}
              <div className="left-container col-4">
                <div className="card mb-4 py-3 px-3">
                    <nav className="navbar justify-content-between p-0">
                      <div className="title">Semua Menu</div>
                      <div>
                        <i className="fa fa-search mr-3"></i>
                        <a className="btn-add btn-sm px-3">
                          <i className="fa fa-plus"></i>
                          &nbsp; Tambah menu
                        </a>
                      </div>
                    </nav>
                </div>

                {
                  this.props.state.isLoaded === true 
                  ?

                  //sementara getAllMenus

                  this.props.state.menus.map((item, id) => {
                    return <div key={id}>
                      <FoodProfileCard
                        id={item.id}
                        title={item.nama}
                        status={item.status}
                        price={item.harga}
                        code={item.kategori}
                        onClick={() => this.props.method.getMenuID(item)}  />
                    </div>
                  })
                  :
                  <div style={{ marginTop: 60 }}>
                    <Loading color="#e6be1e" />
                  </div>
                }
                  
              </div>

              {/* FORM INPUT / EDIT MENU */}
              <div className="right-container col-8">
                <div className="card py-2 px-3">
                  <nav className="navbar justify-content-between">
                    <h3>Tambah Menu</h3>
                  </nav>
                    <div className="row">
                      <div className="col-4">
                      <div className="pic-wrapper">
                        <img className="profile-pic" src={this.props.state.imageRef !== null ? this.props.state.imageRef : "https://images.unsplash.com/photo-1562512048-4fa68a7ecde8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"} />
                        <div className="mask">
                          <img src={require("../../assets/images/addForm.png")} />
                          <input type="file" name="myfile" onChange={(e) => this.props.method.setNewImage(e)} />
                        </div>
                      </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="title">Nama Menu</label>
                          <input type="text" 
                            className="form-control" 
                            id="title" 
                            name="nama_menu" 
                            placeholder="Makanan / Minuman"
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.nama_menu}
                            ></input>
                        </div>

                        <div className="form-group">
                          <label htmlFor="harga">Harga</label>
                          <input type="number" 
                            className="form-control" 
                            id="harga" 
                            name="harga" 
                            placeholder=""
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.harga}
                            ></input>
                        </div>

                        <div className="form-group">
                          <label htmlFor="kategori">Kategori</label>
                          <input type="number" 
                            className="form-control" 
                            id="kategori" 
                            name="kategori" 
                            placeholder=""
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.kategori}
                            ></input>
                        </div>

                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <input type="number" 
                            className="form-control" 
                            id="status" 
                            name="status" 
                            placeholder=""
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.status}
                            ></input>
                        </div>

                        <div className="form-group">
                          <label htmlFor="kapasitas">Deskripsi</label>
                          <input type="text" 
                            className="form-control" 
                            id="deskripsi" 
                            name="deskripsi" 
                            placeholder=""
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.deskripsi}
                            ></input>
                        </div>

                      </div>
                    </div>
                    <nav className="navbar justify-content-between">
                      <h3></h3>
                      <div className='button-group'>
                        <button 
                          className="btn-save btn-sm px-3"
                          onClick={() => this.props.method.addMenu()} >Simpan</button>
                      </div>
                    </nav>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}
