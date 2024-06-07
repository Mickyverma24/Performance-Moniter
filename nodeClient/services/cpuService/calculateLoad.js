const os = require("os");
const cpuAverage = () => {
  const cpus = os.cpus();
  let idleTime = 0; // in milisecond
  let totalTime = 0; // in milisecond
  cpus.forEach((core) => {
    for (let mode in core.times) {
      totalTime += core.times[mode];
    }
    idleTime += core.times.idle;
  });

  return {
    idle: idleTime / cpus.length,
    total: totalTime / cpus.length,
  };
};
module.exports = cpuAverage;