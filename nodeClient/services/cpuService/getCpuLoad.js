const cpuAverage = require('./calculateLoad.js')
const getCpuLoad = async () => {
  const start = cpuAverage();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const end = cpuAverage();
  const idleDiff = end.idle - start.idle;
  const totalDiff = end.total - start.total;
  const percentageOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
  return percentageOfCpu;
};
module.exports = getCpuLoad;