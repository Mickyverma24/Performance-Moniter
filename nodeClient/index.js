// Program that caputure local machine data and send it the node server using socket
// why we are not using here http reason is this data will change in each milisecond.
// but while in deployment this program or piece of software will require a defualt port that's why i am making here
// dependencies
const http = require("http");
const io = require("socket.io-client");
const dotenv = require('dotenv');
const macAddres = require("./services/networkService/getNetworkData.js");
const producedDataOfCpu = require("./services/cpuService/cpuData.js");
const options = {
  auth: {
    token: "aaeygaotohmodihe",
  },
};
dotenv.config();
const port = process.env.PORT
const socket = io("http://127.0.0.1:3000", options);
socket.on("connect", () => {
  const prefInterval = setInterval(() => {
    producedDataOfCpu()
      .then((data) => {
        let prefData = data;
        // prefData.mac = macAddres + Math.floor(Math.random() * 100000); // run when only you are in dev mode
        prefData.mac = macAddres; // run when you are only in prod mode;
        // console.log(prefData)
        socket.emit("prefData", prefData);
      })
      .catch((error) => console.error(error));
  }, 1000);
  socket.on("disconnect", () => {
    clearInterval(prefInterval);
  });
});
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Client is running\n");
});

server.listen(port, () => {
  console.log(`Client is listening on port on some port..`);
});
// this is console.log statement
