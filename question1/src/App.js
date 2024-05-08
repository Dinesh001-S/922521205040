import React, { useState , useEffect} from 'react';
import axios from 'axios';

function App() {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const prime = await axios.get('http://20.244.56.144/test/primes');
      const even = await axios.get('http://20.244.56.144/test/even');
      const random = await axios.get('http://20.244.56.144/test/rand');
      const fibo = await axios.get('http://20.244.56.144/test/fibo');
      
      const primeNumbers = prime.data.numbers;
      const evenNumbers = even.data.numbers;
      const randomNumbers = random.data.numbers;
      const fiboNumbers = fibo.data.numbers;
      
      const allNumbers = [...primeNumbers, ...evenNumbers, ...randomNumbers, ...fiboNumbers];

      const sum = allNumbers.reduce((acc, num) => acc + num, 0);
      const average = sum / allNumbers.length;

      setWindowPrevState(numbers);
      setWindowCurrState(allNumbers);
      setNumbers(allNumbers);
      setAvg(average);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <h1>Average Calculator Microservice</h1>
      <h2>Window Previous State</h2>
      <p>{windowPrevState}</p>

      <h2>Window Current State</h2>
      <p>{windowCurrState}</p>

      <h2>Numbers</h2>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>

      <h2>Average</h2>
      <p>{avg}</p>
    </div>
  );
};

export default App;
