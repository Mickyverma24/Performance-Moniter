import React, { useEffect } from "react";
import socket from '../socketConnection'
import SecondTest from "./SecondTest";
const TestApp = () => {
    useEffect(() => {
     socket.emit('connection',"jai shree ram");

    }, [])
    
  return <div>
    <h1>TestApp</h1>
    <SecondTest/>
  </div>;
};

export default TestApp;
