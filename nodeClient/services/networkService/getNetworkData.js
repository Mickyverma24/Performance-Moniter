const os = require("os");

const netProperties = os.networkInterfaces();

let macAddress;

for (let key in netProperties) {
  let isIntenetFacing = !netProperties[key][0].internal; // if true means it is internet facing we need false wala so
  if (isIntenetFacing) {
    macAddress = netProperties[key][0].mac;
    break;
  }
}
module.exports = macAddress;
