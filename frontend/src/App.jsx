import { useEffect, useState } from "react";
import socket from "./utils/socketConnection.js";
import MoniterScreen from "./components/MonitorScreen.jsx";
import './App.css';
function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    socket.on("prefData", (data) => {
      setPerformanceData((prevData) => {
        return { ...prevData, [data.mac]: data };
      });
    });
  }, []);
  useEffect(() => {
    setInterval(() => {
      // Fetch data from the server and update the state
      // This could be an API call or any other method to get fresh data
      // For now, I'm just sending a dummy request to illustrate the idea
      socket.emit("requestPerfData");
    }, 1000);
  }, []);

  const arrayOfMoniters = Object.values(performanceData).map((d) => (
    <MoniterScreen data={d} key={d.mac} />
  ));
  return <div className="container">{arrayOfMoniters}</div>;
}

export default App;
