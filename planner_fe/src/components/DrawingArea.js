import React from 'react';
import { Layer, Rect, Circle, Line, Text } from 'react-konva';

const DrawingArea = ({lines, draggable=false, selectedCanvas}) => {
  const drawShape = (line, i) =>{
    if(line.shape === "rectangle") {
      return (
        <div>
          <Text
            text="Try to drag the rectangle. It should be on top while drag."
            fontSize={15}
          />
          <Rect
            key={i}
            x={line.points[0]}
            y={line.points[1]}
            width = {line.points[line.points.length-2] - line.points[0]}
            height = {line.points[line.points.length-1] - line.points[1]}
            stroke="black"
            strokeWidth={3}
            draggable={draggable}
            onClick = {draggable? ()=>{selectedCanvas(i)}:()=>{}}
          />
        </div>
      )
    }

    if(line.shape === "line") {
      return (
        <div>
          <Line
            key={i}
            points={line.points}
            tension={0.5}
            stroke="black"
            strokeWidth={3}
            tension={0.5}
            draggable={draggable}
            onClick = {draggable? ()=>{selectedCanvas(i)}:()=>{}}
          />
        </div>
      )
    }

    if(line.shape === "circle") {
      const dx = line.points[line.points.length-2] - line.points[0]
      const dy = line.points[line.points.length-1] - line.points[1]
      return(
        <Circle 
          x={line.points[0]} 
          y={line.points[1]} 
          radius={(Math.sqrt(dx * dx + dy * dy))/2} 
          stroke="black" 
          draggable={draggable}
          onClick = {draggable? ()=>{selectedCanvas(i)}:()=>{}}
          strokeWidth={3}
        />
      )
    }

  }

  return (
    <Layer>
      {lines.map((line, i) => (
        drawShape(line,i)
      ))}
    </Layer>
  );
};

export default DrawingArea;
