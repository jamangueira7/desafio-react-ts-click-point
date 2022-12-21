import React, { useState } from 'react'
import './App.css'

interface ClickedProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

  function getClickPoints(event: React.MouseEvent<HTMLElement>) {
      const { clientX, clientY } = event;

    setClickedPoints([...clickedPoints, { clientX, clientY }]);
  }

  function handleUndo() {
    const newClickedPoint = [...clickedPoints];
    const undoPoint = newClickedPoint.pop();
    if (!undoPoint) {
      return;
    }
    console.log(newClickedPoint)
    setClickedPoints(newClickedPoint);
    setUndoPoints([...undoPoints, undoPoint]);
  }

  function handleRedo() {
    const newUndoPoints = [...undoPoints];
    const redoPoint = newUndoPoints.pop();
    if (!redoPoint) {
      return;
    }
    setUndoPoints(newUndoPoints);
    setClickedPoints([...clickedPoints, redoPoint]);
  }

  return (
    <>
      <button
        disabled={clickedPoints.length === 0}
        onClick={handleUndo}
      >
        Desfazer
      </button>

      <button
        disabled={undoPoints.length === 0}
        onClick={handleRedo}
      >
        Refazer
      </button>

      <div className="App" onClick={getClickPoints}>
        {
          clickedPoints.map((clickedPoint, index) => {
            return <div
              key={index}
              style={{
                left: clickedPoint.clientX - 15,
                top: clickedPoint.clientY - 15,
                position: "absolute",
                borderRadius: '50%',
                border: '5px solid',
                borderColor: 'red',
                boxSizing: 'border-box',
                width: '30px',
                height: '30px',
              }}
            ></div>;
          })
        }
      </div>
    </>
  )
}

export default App
