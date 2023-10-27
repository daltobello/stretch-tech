import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments, getDepartmentObjects } from '../../apiCalls';
import Header from '../Header/Header'
import Gallery from '../Gallery/Gallery'
import ArtCard from '../ArtCard/ArtCard';
import Footer from '../Footer/Footer'

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
      <h1>Stretch Tech!</h1>
      <Header/>
      <Gallery ArtCard={ArtCard}/>
      <Footer/>
    </div>
  );
}

export default App;
