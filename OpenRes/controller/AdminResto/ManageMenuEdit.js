import React, { Component } from 'react'
import { USER } from '../../Model/MUser'
import { Menus } from '../../Model/MMenus'
import { AuthKey } from '../../system/Collection'
import ManageMenuEditView from '../../view/AdminResto/ManageMenuEditView'
import { toast } from 'react-toastify'

export default class ManageMenuEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      nama: '',
      deskripsi: '',
      harga: 0,
      status: 1,
      kategori: 0,

      pageStatus: 'add',
      itemId: 0,
      id_res: 0,

      isImageUpdate: false,
      imageRef: null, //for display only
      image: null,//image file
      isLoaded: false
    }

    this.method = {
      goToPage: this.goToPage.bind(this),
      setForm: this._setForm.bind(this),
      getKategoriMenu: this.getKategoriMenu.bind(this),
      setNewImage: this._setNewImage.bind(this), //show the selected image
      updateMenu: this.updateMenu.bind(this),
      checkRole: this.checkRole.bind(this),
      pageStats: this.pageStats.bind(this),
      getMenuID: this.getMenuID.bind(this),
      deleteMenu: this.deleteMenu.bind(this)
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
        }, () => { this.getAllMenu() })
      } else {
        toast.err("Error!")
      }

    })

      .catch(err => {
        console.log(err, "CATCH USER DATA RES");

      })
  }

  getKategoriMenu = async () => {
    await Menus.GET( this.state.id_res ).then(res => {

      if (Menus.data) {
        this.setState({ menu: Menus.data.kategori, isLoaded: true }, ()=>console.log("RES KATEGORI"))
      }
      else{
        toast.success("Gagal mendapatkan data")
      }
    })

    .catch(
      err => {
        console.log("CATCH", err)
      }
    );
  }

  getAllMenu = async () => {
    await Menus.ALL().then(res => {

      if (Menus.data) {
        this.setState({ menus: Menus.data, isLoaded: true })
      }
      else{
        toast.success("Gagal mendapatkan data")
      }
    })

    .catch(
      err => {
        console.log("CATCH", err)
      }
    );
  }

  getMenuID = (item) => {
    this.setState({
      itemId: item.id, //sementara getAllMenus
      nama: item.nama,
      deskripsi: item.deskripsi,
      harga: item.harga,
      status: item.status,
      kategori: item.kategori,  

    }, () => { 
      this.goToPage(`/r/manage-menu/edit/${this.state.itemId}`), 
      console.log("ITEM ID", this.state.itemId),
      console.log("HARGA MENU", this.state.harga)
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

  updateMenu = async () => {

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
      formData.append('nama', this.state.nama_menu);
      formData.append('kategori_id', this.state.kategori);
      formData.append('deskripsi', this.state.deskripsi);
      formData.append('harga', this.state.harga);
      formData.append('foto', this.state.image);
      formData.append('status', this.state.status);
      formData.append('restoran_id', this.state.id_res);

    } else {
      formData.append('_method', 'put');
      formData.append('nama', this.state.nama_menu);
      formData.append('kategori_id', this.state.kategori);
      formData.append('deskripsi', this.state.deskripsi);
      formData.append('harga', this.state.harga);
      formData.append('foto', this.state.image);
      formData.append('status', this.state.status);
      formData.append('restoran_id', this.state.id_res);
    }

    await Menus.UPDATE(headers, this.state.itemId, formData).then(res => {

      if (Menus.data.status === 200) {
        toast.success("Data berhasil diupdate")
        this.props.history.push('/r/manage-menu')
        this.setState({ isLoading: !this.state.isLoading })
      } else {
        toast.error("Data gagal diupdate, coba ulang kembali")
        this.setState({ isLoading: !this.state.isLoading })
      }

    }, () => { this.getKategoriMenu() })
  }

  deleteMenu = async () => {
    
    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    await Menus.DELETE(headers, this.state.itemId).then(res => {

      if (Menus.data.status === 200) {
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
    return <ManageMenuEditView method={this.method} state={this.state} />
  }
}
