import { useEffect, useRef, useState } from 'react';
import './App.css';
import DrawingArea from './components/DrawingArea';
import Toolbar from './components/Toolbar';
import { Stage } from "react-konva";

const App = () => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState([])
  const [draggable, setDraggable] = useState(false)

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y], shape: selectedMenuItem[0]}]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // useEffect(()=>{
  //   console.log("lines")
  //   console.log(lines)
  // }, [lines])

  const selectOption = (e) =>{
    console.log(e)
    setSelectedMenuItem([...e.keyPath])
  }

  useEffect(()=>{
   if(selectedMenuItem.includes("select")) {
    setDraggable(true)
   } else {
    setDraggable(false)
   }
  }, [selectedMenuItem])

  const selectedCanvas = (index) =>{
    if(selectedMenuItem.includes("delete")) {
      const updatedValues = lines.filter((line,idx)=>idx !=index)
      setLines([...updatedValues])
    }

    if(selectedMenuItem.includes("resize")) {
      const updatedValues = lines.filter((line,idx)=> {
        if(idx === index) {
          line.points.pop()
          line.points.pop()
        }
        return line
      })
      setLines([...updatedValues])
    }

  }

  return (
    <>
      <div>
      <Toolbar onSelectTool={selectOption}></Toolbar>
    </div>
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={selectedMenuItem.includes("draw") && handleMouseDown}
        onMousemove={selectedMenuItem.includes("draw") && handleMouseMove}
        onMouseup={selectedMenuItem.includes("draw")  && handleMouseUp}
      >
        <DrawingArea lines={lines} draggable = {draggable} selectedCanvas={selectedCanvas}></DrawingArea>
      </Stage>
    </div>
    </>
  );
};

export default App;
