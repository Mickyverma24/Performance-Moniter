const os = require("os"); // core module
const getCpuLoad = require("./getCpuLoad.js");
const producedDataOfCpu = async () => {
  const cpus = os.cpus(); // return and array of values
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const inUseMem = totalMemory - freeMemory;
  const memUsage = Math.floor((inUseMem / totalMemory) * 100) / 100;
  const osType = os.type() === "Darwin" ? "Mac" : os.type(); // return windows,darwin,linux
  const upTime = os.uptime(); // return uptime in seconds
  const cpuType = cpus[0].model;
  const numCores = cpus.length;
  const cpuSpeed = cpus[0].speed;
  const cpuLoad = await getCpuLoad();
  return {
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
  };
};

module.exports = producedDataOfCpu;
