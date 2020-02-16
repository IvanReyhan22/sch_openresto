import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import '../../assets/scss/receptionistResult.css'

export default class ReceptionistResultView extends Component {
  render() {
    return (
      <div>
        <Navbar />
        
        <div className="container">

          <div id="content">
            <p>Menampilkan hasil pencarian “BKS191102-001” (hasil 1)</p>
            <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <h2 className="title">BKS191102-001</h2>
                      <h4 className="limit">Batas Waktu : 1 jam 59 menit 58 detik</h4>
                    </div>
                    <div className="desc col-3">Detail</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
