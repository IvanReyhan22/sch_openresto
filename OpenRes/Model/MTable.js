import { String } from "../system/Collection";

export var data = []

export var Table = {

    data: [],

    ALL: function () {

        this.data = [];

        var apiUrl = String.OPENRESTO_API_BASE + 'meja';    

        console.log(apiUrl, "Table ALL@GET");

        return new Promise((resolve, reject) => {

            fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
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

    GETBYRESTO_ID: function (id) {

        this.data = [];

        var apiUrl = String.OPENRESTO_API_BASE + `meja/${id}`;

        console.log(apiUrl, "RES ALL@GET");

        return new Promise((resolve, reject) => {

            fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
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

}