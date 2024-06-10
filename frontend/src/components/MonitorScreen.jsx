import React from "react";
import Mem from "./Mem";
import Cpu from "./Cpu";
import Info from "./Info";
import './Moniter.css';
const MonitorScreen = ({ data }) => {
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
      <h3>Performance</h3>
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={cpuInfo} />
    </div>
  );
};

export default MonitorScreen;
