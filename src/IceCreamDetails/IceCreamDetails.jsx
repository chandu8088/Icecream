import React, { useState } from 'react';
import iceCreamJson from '../ice-cream-json';
import './IceCreamDetails.css';

function IceCreamDetails() {
  const [iceCreamCount, setIceCreamCount] = useState(iceCreamJson);
  const [totalValue, setTotalValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Set today's date as default
  const [additionalInput, setAdditionalInput] = useState('');

  const handleCountChange = (id, increment) => {
    setIceCreamCount(
      iceCreamCount.map(item => {
        if (item.id === id) {
          return { ...item, count: increment ? item.count + 1 : Math.max(item.count - 1, 0) };
        }
        return item;
      })
    );
  };

  const handleEditedCountChange = (id, count) => {
    if (isNaN(count) || count < 0) {
      count = 0;
    }
    setIceCreamCount(
      iceCreamCount.map(item => {
        if (item.id === id) {
          return { ...item, count };
        }
        return item;
      })
    );
  };

  const calculateTotalValue = () => {
    let total = 0;
    iceCreamCount.forEach(item => {
      total += item.price * item.count;
    });
    return total;
  };

  const handleSubmit = async () => {
    const total = calculateTotalValue();
    setTotalValue(total);
    console.log("SELECTED DATE " + selectedDate);
    
    const data = {
      name: 'xyz',
      date: selectedDate,
      additionalInput: additionalInput,
      value: {
        total: total,
        iceCreamCount: iceCreamCount
      },
    };

    try {
      const response = await fetch('http://localhost:3005/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to format the date from YYYY-MM-DD to "DD MMM YYYY"
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <>
      <div className="date-picker-container additional-input-container">
        <label htmlFor="datePicker">Select Date: </label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          className='additional-input'
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div className="formatted-date">
          {/* Display the formatted date */}
          {formatDate(selectedDate)}
        </div>
      </div>

      <div className="additional-input-container">
        <label htmlFor="additionalInput">Additional Input:</label>
        <input
          type="text"
          id="additionalInput"
          value={additionalInput}
          onChange={(e) => setAdditionalInput(e.target.value)}
          className="additional-input"
        />
      </div>

      {iceCreamCount.map(details => (
        <div key={details.id} className="ice-cream-container">
          <div className="ice-cream-images-container">
            <img className="ice-cream-images" src={details.image} alt={details.name} />
          </div>
          <div className="ice-cream-name">{details.name}</div>
          <div>{details.price}</div>
          <div className="counter">
            <button className ="minus" onClick={() => handleCountChange(details.id, false)}>
              -
            </button>
            <span
              className="count"
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) => handleEditedCountChange(details.id, parseInt(e.target.textContent, 10))}
            >
              {details.count}
            </span>
            <button className="plus" onClick={() => handleCountChange(details.id, true)}>
              +
            </button>
          </div>
        </div>
      ))}

      <div className='submit-button-container'>
        <button onClick={handleSubmit} className='submit-button'>Submit</button>
        <div className='total-value'>Total Value: {totalValue}</div>
      </div>
    </>
  );
}

export default IceCreamDetails;