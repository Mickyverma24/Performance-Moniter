
import { useEffect, useState } from 'react';
import socket from './socketConnection.js';
function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
   socket.on('prefData',(data)=>{
    const duplicatePerfomarnceData = {...performanceData};
    duplicatePerfomarnceData[data.mac] = data;
    setPerformanceData(duplicatePerfomarnceData);

   })
  }, [])
  
  return (
    <>
      <div>
      
      </div>
    </>
  )
}

export default App
