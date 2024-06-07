// Program that caputure local machine data and send it the node server using socket
// why we are not using here http reson is this data will change in each milisecond.
// dependencies
const producedDataOfCpu = require("./services/cpuService/cpuData.js");

producedDataOfCpu()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
