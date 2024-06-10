// Program that caputure local machine data and send it the node server using socket
// why we are not using here http reson is this data will change in each milisecond.
// dependencies
const io = require("socket.io-client");
const macAddres = require("./services/networkService/getNetworkData.js");
const producedDataOfCpu = require("./services/cpuService/cpuData.js");
const options = {
  auth : {
    token : "aaeygaotohmodihe"
  }
}

const socket = io("http://127.0.0.1:3000",options);
socket.on("connect", () => {
 const prefInterval =  setInterval(() => {
    producedDataOfCpu()
  .then((data) => {
    let prefData = data;
    // prefData.mac = macAddres + Math.floor(Math.random()*100000); // run when only you are in dev mode
    prefData.mac = macAddres; // run when you are only in prod mode;
    // console.log(prefData)
    socket.emit('prefData',prefData);
  })
  .catch((error) => console.error(error));
  }, 1000);
  socket.on('disconnect',()=>{
    clearInterval(prefInterval);
  })
});

