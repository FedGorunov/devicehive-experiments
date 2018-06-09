const axios = require("axios");
const axiosConfig = {
  headers: { Authorization: config.keyEsp }
};
const config = require("./config");
const bodyReadTemp = { pin: "2" };
const urlReadTemp = "http://" + config.ipAdress + "/api/devices/dht11/read";
const urlShowDisp =
  "http://" + config.ipAdress + "/api/devices/pcf8574/hd44780/write";

var measurTemperature = setInterval(measureTemperature(), 3000);

setTimeout(function() {
  clearInterval(measurTemperature);
  console.log("The end.");
}, 15000);

function measureTemperature() {
  return function() {
    var promisTemp = axios.post(urlReadTemp, bodyReadTemp, axiosConfig);
    promisTemp.then(function(response) {
      showOnDispley(response.data);
    });
    promisTemp.catch(function(error) {
      console.log("error temp: ", error);
    });
  };
}

function showOnDispley(tempJson) {
  let tempString =
    "Temperature= " +
    tempJson["temperature"] +
    "C    Humidity= " +
    tempJson["humidity"];
  let bodyShowDisp = {
    SDA: "4",
    SCL: "5",
    address: config.i2cAdressDisp,
    text: tempString
  };
  console.log("dataTemp=", tempJson);
  axios
    .post(urlShowDisp, bodyShowDisp, axiosConfig)
    .then(function(response) {
      console.log("Displey: ", response.status);
    })
    .catch(function(error) {
      console.log("error display: ", error.data);
    });
}
