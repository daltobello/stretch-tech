import './App.css';
import { useState, useEffect } from 'react';
import { getAllMuseumDepartments, getDepartmentObjects } from '../../apiCalls';
import Header from '../Header/Header'
import Gallery from '../Gallery/Gallery'
import Footer from '../Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import SelectedCard from '../SelectedCard/SelectedCard';
import Favorites from '../Favorites/Favorites';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  const [serverError, setServerError] = useState({hasError: false, message: ''});
  const [departmentObj, setDepartmentObj] = useState([]);
  
  useEffect(() => {
    getAllMuseumDepartments()
      .then(data => {
        const objectIDs = data.objectIDs;

        if (objectIDs.length > 0) {
          return getDepartmentObjects(objectIDs, 10, setDepartmentObj);
        } else {
          console.log('no IDs to fetch details for');
          return [];
        }
      })
      .then(objectDetails => {
        setDepartmentObj(objectDetails);
      })
      .catch(error => {
        setServerError({hasError: true, message: `${error.message}`})
      });
  }, []);

  const resetError = () => {
    setServerError({hasError: false, message: ''});
  };

  return (
    <div className="App">
      <Header resetError={resetError} />
      {serverError.hasError ? (
        <ErrorPage serverError={serverError} resetError={resetError} />
      ) : (
      <Routes>
        <Route path='/' element={<Gallery departmentObj={departmentObj}/>} />
        <Route path='/art/:id' element={<SelectedCard setServerError={setServerError} />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='*' element={<ErrorPage resetError={resetError} />} />
      </Routes> )}
      <Footer/>
    </div>
  );
}

export default App;
