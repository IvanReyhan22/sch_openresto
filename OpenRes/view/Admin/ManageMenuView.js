import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import '../../assets/scss/receptionist-list.css'
import FoodProfileCard from '../components/card/FoodProfileCard'

export default class ManageMenuView extends Component {
  render() {
    return (
      <div>          
        <NavbarAdmin noSearch />

        <div id="receptionist-list">

          <div className="container">

            <div className="row">

              {/* LIST MENU */}
              <div className="col-4">
                <div className="card mb-4 py-3 px-3">
                  <nav className="navbar justify-content-between p-0">
                    <div className="title">Semua Meja</div>
                    <div>
                      <i className="fa fa-search mr-3"></i>
                      <a className="btn-add btn-sm px-3">
                        <i className="fa fa-plus"></i>
                        &nbsp; Tambah menu
                      </a>
                    </div>
                  </nav>
                </div>

                <FoodProfileCard
                  title={"Burger Jumbo"}
                  status={"Tersedia"}
                  price={"45.000"}
                  code={"BG-0001"}  />
                  
              </div>

              {/* FORM INPUT / EDIT MENU */}
              <div className="col-8">
                <div className="card py-2 px-3">
                  <nav className="navbar justify-content-between">
                    <h3>Edit menu Burger jumbo</h3>
                  </nav>
                  <form>
                    <div className="row">
                      <div className="col-4">
                        <img></img>
                      </div>
                      <div className="col">
                        <div class="form-group">
                          <label for="formGroupExampleInput">Nama menu</label>
                          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"></input>
                        </div>
                        <div class="form-group">
                          <label for="in  putEmail4">Harga menu</label>
                          <input type="text" class="form-control" id="inputEmail4" placeholder="Email"></input>
                        </div>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Status</label>
                          <select class="form-control" id="exampleFormControlSelect1">
                            <option>Tersedia</option>
                            <option>Re-stok</option>
                            <option>Habis</option>
                          </select>
                        </div>
                      </div>
                    </div>                  
                    <nav className="navbar justify-content-between">
                      <h3></h3>
                      <div className='button-group'>
                        <button type="submit" className="btn btn-success px-3">Simpan</button>
                      </div>
                    </nav>
                  </form>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

