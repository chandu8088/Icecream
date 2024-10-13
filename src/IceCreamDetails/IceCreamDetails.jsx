import React, { useState } from 'react';
import iceCreamJson from '../ice-cream-json';
import image from '../assets/variaties/big-cone.jpeg';

import './IceCreamDetails.css';

function IceCreamDetails() {
  const [iceCreamCount, setIceCreamCount] = useState(iceCreamJson);
  const [totalValue, setTotalValue] = useState(0); // add a new state for total value


  const handleCountChange = (id, increment) => {
    setIceCreamCount(
      iceCreamCount.map(item => {
        if (item.id === id) {
          return { ...item, count: increment ? item.count + 1 : item.count - 1 };
        }
        return item; // return the original item if it's not the one being updated
      })
    );
  };
  const handleeditedCountChange = (id, count) => {
    console.log(`count value is ${count}`)
    setIceCreamCount(
      iceCreamCount.map((item, i) => {
        if (item.id === id) {
          return { ...item, count };
        }
        return item;
      })
    );
  };
  const handleTotalValue = () => {
    let total = 0;
    iceCreamCount.forEach(item => {
      total += item.price * item.count;
    });
    setTotalValue(total);
  };
  return (
    <>
      {iceCreamCount.map(details => (
        <div key={details.id} className="ice-cream-container">
          <div className="ice-cream-images-container">
            <img className="ice-cream-images" src={details.image} />
          </div>
          <div className="ice-cream-name">{details.name}</div>
          <div>{details.price}</div>
          <div className="counter">
            <button className="minus" onClick={() => handleCountChange(details.id, false)}>
              -
            </button>
            <span
        className="count"
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={(e) => handleeditedCountChange(details.id, parseInt(e.target.textContent, 10))}
      >{details.count}</span>
            <button className="plus" onClick={() => handleCountChange(details.id, true)}>
              +
            </button>
          </div>
        </div>
      ))}
      <div className='submit-button-container'><button onClick={handleTotalValue} className='submit-button'>Submit</button>
      <div className='total-value'>Total Value: {totalValue}</div>
      </div>
    </>
  );
}

export default IceCreamDetails;