import React, { Component } from 'react'
import ManageMenuView from '../../view/AdminResto/ManageMenuView'
import { Menus } from '../../Model/MMenus'
import { USER } from '../../Model/MUser'
import { AuthKey } from '../../system/Collection'
import { toast } from 'react-toastify'

export default class ManageMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      nama_menu: '',
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
      getAllMenu: this.getAllMenu.bind(this),
      setNewImage: this._setNewImage.bind(this), //show the selected image
      addMenu: this._addMenu.bind(this),
      checkRole: this.checkRole.bind(this),
      setForm: this._setForm.bind(this),  
      getMenuID: this.getMenuID.bind(this)
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkRole();
    console.log("PAGE STATUS", this.state.pageStatus);
  }

  getMenuID = (item) => {
    this.setState({
      itemId: item.id, //sementara getAllMenus
      nama_menu: item.nama_menu,
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

  goToPage = (request) => {
    this.props.history.push({
      pathname: `${request}`,
      state: {
        data: request.id
      }
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

  checkRole = async () => {

    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    await USER.GETUSERLOGIN(headers).then(res => {

      if(USER.data){
        this.setState({
          id_res: USER.data.restoran.id,
        }, () => { 
          this.getAllMenu()
          // console.log("ID RESTORAN : ", this.state.id_res)
         })
      } 
      else{
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

  _setForm = e => {
    this.setState({
      [e.target.name]: [e.target.value].toString()
    })
  }

  _addMenu = async () => {
    this.setState({ isLoading: !this.state.isLoading})

    const storage = localStorage.getItem(AuthKey.LOGIN_DATA)
    const parse = JSON.parse(storage)

    let headers = {
      token_type: parse.token_type,
      access_token: parse.access_token
    }

    let formData = new FormData();

    formData.append('nama', this.state.nama_menu);
    formData.append('kategori_id', this.state.kategori);
    formData.append('deskripsi', this.state.deskripsi);
    formData.append('harga', this.state.harga);
    formData.append('foto', this.state.image);
    formData.append('status', this.state.status);
    formData.append('restoran_id', this.state.id_res);

    await Menus.ADD(headers, formData).then(res => {

      if (Menus.data.status === 201) {
        toast.success("Data berhasil ditambahkan")
        this.checkRole();
        this.setState({ isLoading: !this.state.isLoading })
      }
      else {
        toast.error("Data gagal disimpan, coba ulang kembali")
      }
    })

    .catch(
      err => {
        this.setState({ isLoading: !this.state.isLoading })
        console.log("ADD", err)
      }
    )
  }

  render() {
    return <ManageMenuView method={this.method} state={this.state} />
  }
}
