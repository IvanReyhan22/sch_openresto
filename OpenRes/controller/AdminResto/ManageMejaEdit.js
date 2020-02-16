import React, { Component } from 'react'
import ManageMejaEditView from '../../view/AdminResto/ManageMejaEditView'
import { Meja } from '../../Model/MMeja'
import { AuthKey } from '../../system/Collection'
import { USER } from '../../Model/MUser'
import { toast } from 'react-toastify'

export default class ManageMejaEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meja: [],
      no_meja:0,
      price: 0,
      status: 1,
      kapasitas: 0,
      pageStatus: 'update',
      itemId: 0,
      id_res: 0,

      isImageUpdate: false,
      imageRef: null, //for display only
      image: null,//image file
      isLoaded: false,
 
    }

    this.method = {
      goToPage: this.goToPage.bind(this),
      setForm: this._setForm.bind(this),
      getMeja: this.getMeja.bind(this),
      setNewImage: this._setNewImage.bind(this), //show the selected image
      // addMeja: this._addMeja.bind(this),
      updateMeja: this.updateMeja.bind(this),
      checkRole: this.checkRole.bind(this),
      pageStats: this.pageStats.bind(this),
      getMejaID: this.getMejaID.bind(this),
      deleteMeja: this.deleteMeja.bind(this)
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    console.log("RESTARTING PAGE")
    this.pageStats()
  }

  /**
     * DECIDE IF PAGE IS FOR UPDATE DATA OR ADD DATA
     */
  pageStats = () => {
    const url = this.props.location.pathname
    const split = url.split('/')

    if (split[4]) {
      this.setState({ pageStatus: "edit", itemId: split[4] }, () => this.checkRole())
    }
    else { console.log("ERR", this.state.pageStatus) }

  }

  goToPage = (request) => {
    this.props.history.push({
      pathname: `${request}`,
      state: {
        data: request.id
      }
    }, () => {this.pageStats()})
  }

  checkRole = async () => {

    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    await USER.GETUSERLOGIN(headers).then(res => {

      if (USER.data) {
        this.setState({
          id_res: USER.data.restoran.id,
        }, () => { this.getMeja() })
      } else {
        toast.err("Error!")
      }

    })

      .catch(err => {
        console.log(err, "CATCH USER DATA RES");

      })
  }

  getMeja = async () => {
    await Meja.GET(this.state.id_res).then(res => {

      if (Meja.data) {
        this.setState({
          meja: Meja.data.meja,
          isLoaded: true
        })
      }
      else {
        toast.success("Gagal mendapatkan data")
      }
    })
    .catch(
      err => {
        console.log("CATCH", err)
      }
    );
  }

  getMejaID = (item) => {
    this.setState({
      itemId: item.meja_id,
      no_meja: item.no_meja,
      price: item.harga,
      kapasitas: item.kapasitas

    }, () => { 
      this.goToPage(`/r/manage-meja/edit/${this.state.itemId}`), 
      console.log("ITEM ID", this.state.itemId)
    })
  }

  _setForm = e => {
    this.setState({
      [e.target.name]: [e.target.value].toString()
    })
  }

  _setNewImage = (e) => {

    if (e.target.files[0].size <= 2000000) {
      this.setState({
        image: e.target.files[0]
      })

      if (e.target.files[0]) {
        this.setState({
          imageRef: URL.createObjectURL(e.target.files[0]),
          isImageUpdate: true
        })
      }
      else{
        toast.warn("The image doesn't support")
      }

    }
    else{
      toast.warn("File size have to be less than 2MB")
    }

  }

  updateMeja = async () => {

    this.setState({ isLoading: !this.state.isLoading })

    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    let formData = null
    formData = new FormData();

    if (this.state.isImageUpdate === true) {
      formData.append('_method', 'put');
      formData.append('no_meja', this.state.no_meja);
      formData.append('foto', this.state.image);
      formData.append('status', this.state.status);
      formData.append('kapasitas', this.state.kapasitas);
      formData.append('harga', this.state.price);

    } else {
      formData.append('_method', 'put');
      formData.append('no_meja', this.state.no_meja);
      formData.append('foto', this.state.image);
      formData.append('status', this.state.status);
      formData.append('kapasitas', this.state.kapasitas);
      formData.append('harga', this.state.price);
    }

    await Meja.UPDATE(headers, this.state.itemId, formData).then(res => {

      if (Meja.data.status === 200) {
        toast.success("Data berhasil diupdate")
        this.props.history.push('/r/manage-meja')
        this.setState({ isLoading: !this.state.isLoading })
      } else {
        toast.error("Data gagal diupdate, coba ulang kembali")
        this.setState({ isLoading: !this.state.isLoading })
      }

    }, () => { this.getMeja() })
  }

  deleteMeja = async () => {
    
    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    await Meja.DELETE(headers, this.state.itemId).then(res => {

      if (Meja.data.status === 200) {
        toast.success("Data berhasil dihapus")
        this.props.history.push('/r/manage-meja')
      }
      else{
        toast.error("Data gagal disimpan")
      }
    })
    
    .catch(
      err => {
        console.log("CONSOLE", err)
      }
    )
  }

  render() {
    return <ManageMejaEditView method={this.method} state={this.state} />
  }
}

