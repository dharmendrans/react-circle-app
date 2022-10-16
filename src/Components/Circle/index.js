
import './circle.css';
import { useState } from "react";

function CircleComponent() {
  const totalCircles = 5;

  const getRandomColor = () => {
    const maxVal = 0xFFFFFF;
    return "#" + Math.floor(Math.random()*maxVal).toString(16).padStart(6, '0').toUpperCase();
  }

  // get circles list
  const getCircles = (n) => {
    const circlesArr = [];
    for (let i = 1; i <= n; i++) {
      circlesArr.push({
        id: i,
        color: getRandomColor(),
        show: true
      });
    }
    return circlesArr;
  }

  const [circles, setCircles] = useState(getCircles(totalCircles))
  const [textValue, setTextValue] = useState(null);

  // This function show circles inside the empty box
  const moveCircleToEmptyBox = () => {
    if (textValue < 1 || textValue > 5) {
      return;
    }
    const index = Number(textValue) - 1;
    const trueCircles = circles?.filter((v) => v.show === true);
    if (index >= trueCircles.length) {
      return;
    }
    const targetCircle = trueCircles.at(index);
    const newCircles = circles.map((c) => c.id === targetCircle.id ? { ...c, show: false } : c);
    setCircles(newCircles);
  }

  // This function hide the circle from empty box and show the circle on its original position.
  const moveCircleToOriginalPosition = (id) => {
    const removeCircleFromEmptyBox = circles.map((c) => c.id === id ? { ...c, show: true } : c)
    setCircles(removeCircleFromEmptyBox);
  }

  return (
    <div className="CircleComponent">
      <div className='main-box'>
        <div className='box'>
          <h3>Empty Box</h3>
          <div className='empty-box'>
            {circles?.filter((v) => v.show === false).map((circle) => {
              return <button key={circle.id}
                className='circle'
                id={`circle-${circle.id}`}
                style={{ background: `${circle.color}` }}
                onClick={() => moveCircleToOriginalPosition(circle.id)}
              ></button>
            })
            }
          </div>
        </div>

        <div className='box'>
          <h3>{circles.length} Circles</h3>
          {circles?.filter((v) => v.show === true).map((circle) => {
            return <div key={circle.id} id={`circle-${circle.id}`} className='circle' style={{ background: `${circle.color}` }}></div>
          })
          }
        </div>

        <div className='box'>
          <h3>A Text Box</h3>
          <input type="number" placeholder="Enter number between 1 to 5" min="1" max={circles.length} className='input-box'
            onChange={(e) => setTextValue(e.target.value)}
          />
          <div>
            <button className='btn' onClick={moveCircleToEmptyBox}>Shoot</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircleComponent;
