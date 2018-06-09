const axios = require('axios');
const keyEsp = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImEiOlsyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTUsMTYsMTddLCJlIjoxNTQzMTM1ODM4OTQwLCJ0IjowLCJ1IjoyMzM3LCJuIjpbIjIzMTQiXSwiZHQiOlsiKiJdfX0.vms7qK9lQhXo_SrnMVm1Y7etlapHltGZhgYjE0DCmek';
const config = {
    headers: { 'Authorization': keyEsp }
};
let bodyComp = {
    "SDA": "4",
    "SCL": "5",
    "address": "0x3C"
};
const urlReadComp = "http://192.168.0.103/api/devices/hmc5883l/read";



setInterval(showComp, 1000);

function showComp() {
    axios.post(urlReadComp, bodyComp, config)
        .then(function (responce) {
            console.log(responce.data);
        }).catch(function (error) {
            console.log("error :", error.message);
        });
}
