import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments, getObjects } from './apiCalls';

function App() {
  const [error, setError] = useState("")
  const [object, setObject] = useState([])

  useEffect(() => {
    getAllMuseumDepartments()
    .then(departmentsData => {
    getObjects(departmentsData.objectIDs)
    // .then(data => setObject(data))
    // console.log(departmentsData.objectIDs)
    
    })
    .catch(error => setError(error.message))
  }, [])


  return (
    <div className="App">
      <h1>Stretch Tech!</h1>
    </div>
  );
}

export default App;
