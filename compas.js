const axios = require("axios");
const config = require("./config");

const axiosConfig = {
  headers: { Authorization: config.keyEsp }
};
let bodyComp = {
  SDA: "4",
  SCL: "5",
  address: config.i2cAdressComp
};
const urlReadComp = "http://" + config.ipAdress + "/api/devices/hmc5883l/read";

setInterval(showComp, 1000);

function showComp() {
  axios
    .post(urlReadComp, bodyComp, axiosConfig)
    .then(function(responce) {
      console.log(responce.data);
    })
    .catch(function(error) {
      console.log("error :", error.message);
    });
}
