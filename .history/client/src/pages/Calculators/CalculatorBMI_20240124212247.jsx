import React, { useState, useEffect } from 'react';

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <label>
        {label}:
        <input
          type="number"
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = new WebSocket('ws://localhost:3000');
    setSocket(newSocket);

    // Handle WebSocket messages
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.bmi) {
          setBmi(data.bmi);
        }
      } catch (err) {
        setError('Error parsing WebSocket response');
      }
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (socket) {
      socket.send(JSON.stringify({ weight, height }));
    } else {
      setError('WebSocket connection not established');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <NumberInput label="Weight (kg)" value={weight} onChange={setWeight} />
        <NumberInput label="Height (cm)" value={height} onChange={setHeight} />
        <button type="submit" style={{ marginTop: '10px' }}>Calculate BMI</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default BMICalculator;
