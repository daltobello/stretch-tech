import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments, getDepartmentObjects } from '../../apiCalls';
import Header from '../Header/Header'
import Gallery from '../Gallery/Gallery'
import Footer from '../Footer/Footer'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [error, setError] = useState("");
  const [departmentObj, setDepartmentObj] = useState([]);

  useEffect(() => {
    getAllMuseumDepartments()
      .then(data => {
        const objectIDs = data.objectIDs;
        console.log("object ids: ", objectIDs);

        if (objectIDs.length > 0) {
          return getDepartmentObjects(objectIDs);
        } else {
          console.log('no IDs to fetch details for');
          return [];
        }
      })
      .then(objectDetails => {
        console.log("objectDetails: ", objectDetails);
        setDepartmentObj(objectDetails);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="App">
      <Header/>
      <Gallery departmentObj={departmentObj}/>
      <Footer/>
    </div>
  );
}

export default App;
