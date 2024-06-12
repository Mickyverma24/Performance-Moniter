import io from "socket.io-client";
const options = {
  auth: {
    token: 'aidofh;aoidsh;aihdf',
  },
};
const socket = io.connect("http://localhost:3000", options);

export default socket;
