import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from "./component/Canvas";

function App() {
  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = '#dbe8db';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };
  return (
    <div>
      <Canvas draw={draw} height={600} width={600} />
    </div>
  );
}

export default App;
