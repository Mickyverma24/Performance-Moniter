import { useRef } from "react";
import drawAnimation from "../utils/canvasMoniterAnimation.js";
const Mem = ({ data }) => {
  const { freeMemory, inUseMem, memUsage, totalMemory } = data;
  const memRef = useRef();
  drawAnimation(memRef.current, memUsage * 100);
  return (
    <div className="mem col-3">
      <h3>Memory Useage</h3>
      <div className="canvas-wrapper">
        <canvas ref={memRef} width="200" height="200"></canvas>
        <div className="mem-text">{memUsage * 100}%</div>
      </div>
      <div>Total Memory : {convertToGb(totalMemory)}GB</div>
      <div>Free Memory : {convertToGb(freeMemory)}GB</div>
      <div>Memory In use : {convertToGb(inUseMem)}GB</div>
    </div>
  );
};

export default Mem;
function convertToGb(mem) {
  return Math.floor((mem / 1073741824) * 100) / 100;
}
