import { String } from '../system/Collection'
import { toast } from 'react-toastify'

export var data = []

export var MCheckout = {

  data: [],

  ALL: function (headers) {

    this.data = [];

    var apiUrl = String.OPENRESTO_API_BASE + `reserve`;

    console.log(apiUrl, "meja@Store");

    return new Promise((resolve, reject) => {

      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `${headers.token_type} ${headers.access_token}`,
          "Content-Type": "application/json"
        }
      })

        .then((response) => response.json())
        .then((responseData) => {

          console.log(responseData, "MCheckout All")

          if (responseData) {

            this.data = responseData;
            resolve(true);

          }
          else {
            resolve(false)
          }

        })

        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });
  },

  RESERVATION: function (headers, formData) {

    this.data = [];

    var apiUrl = String.OPENRESTO_API_BASE + `reserve`;

    console.log(apiUrl, "meja@Store");

    return new Promise((resolve, reject) => {

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `${headers.token_type} ${headers.access_token}`,
          // "Content-Type": "application/json"
        },
        body: formData
      })

        .then((response) => response.json())
        .then((responseData) => {

          console.log(responseData, "RES MCheckout")

          if (responseData) {

            this.data = responseData;
            resolve(true);

          }
          else {
            resolve(false)
          }

        })

        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });
  },

  RESERVATION_BY_ID: function (headers, id) {

    this.data = [];

    var apiUrl = String.OPENRESTO_API_BASE + `reserve/${id}`;

    console.log(apiUrl, "Table ALL@GET");

    return new Promise((resolve, reject) => {

      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `${headers.token_type} ${headers.access_token}`,
        }
      })
        .then((response) => response.json())
        .then((responseData) => {

          if (responseData) {

            this.data = responseData;
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });

  },

  CANCEL_RESERVATION: function (headers, id) {

    this.data = [];

    var apiUrl = String.OPENRESTO_API_BASE + `reserve/${id}`;

    console.log(apiUrl, "<CANCEL_RESERVATION");

    return new Promise((resolve, reject) => {

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `${headers.token_type} ${headers.access_token}`,
        },
        body: JSON.stringify({
          _method: 'delete'
        })
      })
        .then((response) => response.json())
        .then((responseData) => {

          if (responseData) {

            this.data = responseData;
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });

  },

  UPDATE_RESERVATION: function (headers, id,status) {

    this.data = [];

    var apiUrl = String.OPENRESTO_API_BASE + `reserve/${id}`;

    console.log(apiUrl, "<CANCEL_RESERVATION");

    return new Promise((resolve, reject) => {

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `${headers.token_type} ${headers.access_token}`,
        },
        body: JSON.stringify({
          paid: status,
          _method: 'put'
        })
      })
        .then((response) => response.json())
        .then((responseData) => {

          if (responseData) {

            this.data = responseData;
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });

    });

  }
}