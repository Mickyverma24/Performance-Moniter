import React, { useEffect } from 'react'
import socket from '../socketConnection'

const SecondTest = () => {
    useEffect(() => {
        socket.emit("idharse","bhijaishreeram");
    }, [])
    
  return (
    <div>SecondTest</div>
  )
}

export default SecondTest