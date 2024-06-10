import { useEffect, useState } from "react";
import socket from "./utils/socketConnection.js";
import MoniterScreen from "./components/MonitorScreen.jsx";
function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    socket.on("prefData", (data) => {
      let copyPrefData = { ...performanceData };
      copyPrefData[data.mac] = data;
      setPerformanceData(copyPrefData);
    });
  }, []);
  const arrayOfMoniters = Object.values(performanceData).map((d) => (
    <MoniterScreen data={d} key={d.mac} />
  ));
  return <div className="container">{arrayOfMoniters}</div>;
}

export default App;
