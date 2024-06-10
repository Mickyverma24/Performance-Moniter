import {useState,useEffect} from "react";
import Mem from "./Mem";
import Cpu from "./Cpu";
import Info from "./Info";
import socket from "../utils/socketConnection.js";
import './Moniter.css';

const MonitorScreen = ({ data }) => {
  const [online,setOnline] = useState(true);
  useEffect(() => {
    socket.on('isConnected',({runningMachineMacAddress,isLive})=>{
      if (runningMachineMacAddress===data.mac){
        setOnline(isLive);
      }
    })
  }, [])
  const isLive = !online?<div className="not-active">CLIENT IS OFFLINE</div>:<></>;
  const {
    freeMemory,
    totalMemory,
    inUseMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    mac,
  } = data;
  const cpuData = { cpuLoad };
  const memData = { freeMemory, totalMemory, inUseMem, memUsage };
  const cpuInfo = { osType, upTime, cpuType, numCores, cpuSpeed };
  return (
    <div className="moniter row justify-content-evenly">
      {isLive}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={cpuInfo} />
    </div>
  );
};

export default MonitorScreen;
