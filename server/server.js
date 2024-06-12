// this is the main server which handle data from different - all node clients and send data to the frontend using socket.io

//   ------> Node core moudles <----------------
const cluster = require("cluster"); // to use multi ple threads of the node
const http = require("http");
const numCPUs = require("os").cpus().length;
//   ------> Third Party moudles <----------------
const { Server } = require("socket.io");
const { setupMaster, setupWorker } = require("@socket.io/sticky");
const { createAdapter, setupPrimary } = require("@socket.io/cluster-adapter");
//   ------> MY own created moudles <----------------
const socketMain = require("./socketMain.js");

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  const httpServer = http.createServer();
 // setup sticky sessions
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  cluster.setupPrimary({
    serialization: "advanced",
  });

  httpServer.listen(3000);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  // creating http server to for making use in socket.io server
  const httpServer = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end();
    }
  });

// socket.io server creation here 'io' all in the code represent socket.io server
  const io = new Server(httpServer, {
    cors: {
      origin: "http://127.0.0.1:5173",
      credentials: true,
    },
  });

  // use the cluster adapter
  io.adapter(createAdapter());

  // setup connection with the primary process
  setupWorker(io);
  // 
  socketMain(io);
}
