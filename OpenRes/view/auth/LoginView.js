import React, { Component } from 'react'

import '../../assets/scss/auth.css'
// import Loading from '../../../../sisg/SISG/view/components/Loading'

export default class LoginView extends Component {
  render() {
    return (
      <div id="login">

        {/* <img src={IMAGE.WHITE_CAFFE} className="login-bg"></img> */}

        <div className="overlay">

          <div className="logo-img">
            <img src={require("../../assets/images/The Logo.png")} className="logo"></img>
          </div>

        <h4>Selamat Datang di OpenResto!</h4>

          <div className="form-group">
            <label htmlFor="email">Alamat email</label>
            <input type="email" className="form-control mb-4" name="email" placeholder="your@email.here" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Kata sandi</label>
            <input type="password" className="form-control mb-4" name="password" onChange={(e) => this.props.method.setForm(e)}></input>
          </div>
          <button type="submit" className="btn btn-success px-4 py-2" onClick={() => this.props.method.login()}>
            {
              this.props.state.isLoading
                ?
                <Loading color="#ffffff" />
                :
                "Masuk"
            }
          </button>

          <p>
            Tidak punya akun?
                  <a onClick={() => this.props.method.goToPage("register")} className="register">Daftar disini</a>
          </p>
        </div>

      </div>
    )
  }
}
