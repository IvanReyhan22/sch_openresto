import React, { Component } from 'react'
import { IMAGE } from '../../assets/images'
import '../../assets/scss/auth.css'
// import Loading from '../../../../sisg/SISG/view/components/Loading'

export default class RegisterView extends Component {
  render() {
    return (
      <div id="register">

        <div className="overlay">

          <div className="logo-img">
            <img src={require("../../assets/images/The Logo.png")} className="logo"></img>
          </div>
          <h4>Selamat Datang di OpenResto!</h4>
          <div className="form-group ">
            <label htmlFor="name">Nama Lengkap</label>
            <input type="text" className="form-control mb-4" name="name" placeholder="" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <div className="form-group ">
            <label htmlFor="email">Alamat email</label>
            <input type="email" className="form-control mb-4" name="email" placeholder="your@email.here" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <div className="form-group ">
            <label htmlFor="password">Kata sandi</label>
            <input type="password" className="form-control mb-4" name="password" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <div className="form-group ">
            <label htmlFor="password">Ulangi Kata sandi</label>
            <input type="password" className="form-control mb-4" name="password_confirmation" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <p style={{color:'#e74c3c'}}>{this.props.state.err_message}</p>
          <button type="submit" className="btn btn-success px-4 py-2 w-25 mb-2" onClick={() => this.props.method.register()}>
            {
              this.props.state.isLoading
                ?
                <Loading color="#ffffff"/>
                :
                "Daftar"
            }
          </button>
          <p>
            Sudah punya akun?
              <a onClick={() => this.props.method.goToPage("login")} className="register">Masuk disini</a>
          </p>
        </div>
      </div>
    )
  }
}
