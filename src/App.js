import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments } from './apiCalls';

function App() {
  const [error, setError] = useState("")

  useEffect(() => {
    getAllMuseumDepartments()
    .then(departmentsData => console.log(departmentsData))
    .catch(error => setError(error.message))
  }, [])

  return (
    <div className="App">
      <h1>Stretch Tech!</h1>
    </div>
  );
}

export default App;
