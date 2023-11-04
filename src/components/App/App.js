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
import Loader from '../Loader/Loader';

function App() {
  const [serverError, setServerError] = useState({hasError: false, message: ''});
  const [departmentObj, setDepartmentObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    getAllMuseumDepartments()
      .then(data => {
        const objectIDs = data.objectIDs;

        if (objectIDs.length > 0) {
          return getDepartmentObjects(objectIDs, 50, setDepartmentObj);
        } else {
          console.log('no IDs to fetch details for');
          return [];
        }
      })
      .then(objectDetails => {
        setDepartmentObj(objectDetails);
      })
      .then(() => setIsLoading(false))
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
      {isLoading ? (
        <Loader />
      ) : serverError.hasError ? (
        <ErrorPage serverError={serverError} resetError={resetError} />
      ) : (
      <Routes>
        <Route path='/' element={<Gallery departmentObj={departmentObj}/>} />
        <Route path='/art/:id' element={<SelectedCard setServerError={setServerError} setIsLoading={setIsLoading} />} />
        <Route path='/favorites' element={<Favorites setIsLoading={setIsLoading} />} />
        <Route path='*' element={<ErrorPage resetError={resetError} />} />
      </Routes> )}
      <Footer/>
    </div>
  );
}

export default App;
