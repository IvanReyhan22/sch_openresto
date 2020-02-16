import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
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
                      <div className="title">Semua Meja</div>
                      <div>
                        <i className="fa fa-search mr-3"></i>
                        <a className="btn-add btn-sm px-3">
                          <i className="fa fa-plus"></i>
                          &nbsp; Tambah meja
                        </a>
                      </div>
                    </nav>
                </div>

                {
                  this.props.state.isLoaded === true 
                  ?
                  this.props.state.meja.map((item, id) => {
                    return <div key={id}>
                      <FoodProfileCard
                        id={item.id}
                        title={item.no_meja}
                        status={item.status}
                        price={item.price}
                        code={id}
                        onClick={() => this.props.method.goToPage(`/manage-meja/edit/${id}`)}  />
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
                    <h3>Tambah Meja</h3>
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
                        <div class="form-group">
                          <label for="title">Nomor meja</label>
                          <input type="text" 
                            class="form-control" 
                            id="title" 
                            name="title" 
                            placeholder="Meja 000"
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.title}
                            ></input>
                        </div>
                        <div class="form-group">
                          <label for="price">Harga reervasi meja</label>
                          <input type="number" 
                            class="form-control" 
                            id="price" 
                            name="price" 
                            placeholder="Rp"
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.price}
                            ></input>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Status</label>
                          <select class="form-control" 
                            name="status" 
                            id="exampleFormControlSelect1"
                            onChange={ (e) => this.props.method.setForm(e)}
                            value={this.props.state.status}>
                            <option>Tersedia</option>
                            <option>Dipesan</option>
                            <option>Tidak Tersedia</option>
                          </select>
                        </div>
                      </div>
                    </div>                  
                    <nav className="navbar justify-content-between">
                      <h3></h3>
                      <div className='button-group'>
                        <button 
                          className="btn-save btn-sm px-3"
                          onClick={this.props.state.pageStats === 'add' ? () => this.props.method.addMeja() : () => this.props.method.updateMeja()} >Simpan</button>
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
