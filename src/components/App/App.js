import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments, getDepartmentObjects } from '../../apiCalls';
import Header from '../Header/Header'
import Gallery from '../Gallery/Gallery'
import Footer from '../Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import SelectedCard from '../SelectedCard/SelectedCard';
import Favorites from '../Favorites/Favorites';

function App() {
  const [error, setError] = useState("");
  const [departmentObj, setDepartmentObj] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]); // will want to use redux here, doing regular state for now.
  

  useEffect(() => {
    getAllMuseumDepartments()
      .then(data => {
        const objectIDs = data.objectIDs;
        // console.log("object ids: ", objectIDs);

        if (objectIDs.length > 0) {
          return getDepartmentObjects(objectIDs, 80, setDepartmentObj);
        } else {
          console.log('no IDs to fetch details for');
          return [];
        }
      })
      .then(objectDetails => {
        console.log("objectDetails: ", objectDetails);
        setDepartmentObj(objectDetails);
        console.log('DEPARTOBJ', departmentObj)
      })
      .catch(error => {
        setError(error.message)
      });
  }, []);

  return (
    <div className="App">
      {error && <div className="error-message">{error}</div>}
      <Header/>
      <Routes>
        <Route path='/' element={<Gallery departmentObj={departmentObj} setFavoriteCards={setFavoriteCards} favoriteCards={favoriteCards}/>} />
        <Route path='/art/:id' element={<SelectedCard />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
