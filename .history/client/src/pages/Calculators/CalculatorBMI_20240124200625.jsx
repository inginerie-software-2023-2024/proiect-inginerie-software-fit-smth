import React, { useState } from 'react';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/calculate-bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, height }),
      });
    } catch (error) {
      console.error('Error fetching:', error);
    }
    

      const data = await response.json(); 

      if (response.ok) {
        setBmi(data.bmi);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default BMICalculator;
