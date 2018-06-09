const axios = require('axios');
const keyEsp = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImEiOlsyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTUsMTYsMTddLCJlIjoxNTQzMTM1ODM4OTQwLCJ0IjowLCJ1IjoyMzM3LCJuIjpbIjIzMTQiXSwiZHQiOlsiKiJdfX0.vms7qK9lQhXo_SrnMVm1Y7etlapHltGZhgYjE0DCmek';
const config = {
    headers:{'Authorization': keyEsp}
}
const bodyReadTemp ={"pin":"2"};
const urlReadTemp ="http://192.168.0.106/api/devices/dht11/read";
const urlShowDisp ="http://192.168.0.106/api/devices/pcf8574/hd44780/write";


var measurTemperature = setInterval(measureTemperature(), 3000);

setTimeout(function(){
    clearInterval(measurTemperature);
    console.log("The end.");
}, 15000);



function measureTemperature() {
    return function () {
        var promisTemp = axios.post(urlReadTemp, bodyReadTemp, config);
        promisTemp.then(function (response) {
        
            showOnDispley(response.data);
        });
        promisTemp.catch(function (error) {
            console.log('error temp: ', error);
        });
    };
}

function showOnDispley(tempJson) {
    let tempString = "Temperature= " + tempJson["temperature"] + "C    Humidity= " + tempJson["humidity"];
    let bodyShowDisp = {
    "SDA": "4",
        "SCL": "5",
        "address": "0x4E",
        "text": tempString
    }; 
    console.log("dataTemp=", tempJson);
    let promisDisp = axios.post(urlShowDisp, bodyShowDisp, config);
    promisDisp.then(function (response) {
        console.log("Displey: ", response.status);
    });
    promisDisp.catch(function (error) {
        console.log('error display: ', error.data);
    });
}
 