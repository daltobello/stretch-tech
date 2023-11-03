import { getSingleArtDetails } from '../../apiCalls';
import './Favorites.css'
import { useSelector } from 'react-redux';
import ArtCard from '../ArtCard/ArtCard';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

function Favorites() {
  const favoriteCards = useSelector((state) => state.favoriteCards);
  console.log(favoriteCards)
  const [allFaves, setAllFaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaves = async () => {
      const fetchedFaves = await Promise.all(
        favoriteCards.map(async (id) => {
          const data = await getSingleArtDetails(id)

          return (
            <ArtCard 
              id={data.objectID}
              key={data.objectID}
              date={data.objectDate}
              image={data.primaryImage}
              title={data.title}
              artist={data.artistAlphaSort}
            />
          )
        })
      )
      setAllFaves(fetchedFaves)
      setLoading(false)
    }
    fetchFaves()
    
  }, [favoriteCards, setLoading])

  if (loading) {
    return <Loader />
  }

  if (allFaves.length === 0) {
    return (
      <div className='no-tracked'>
          <h2 className='no-tracked-text'>You do not have any saved art pieces.</h2>
        </div>
    )
  } else {
      return (
        <div className='favorites-container'>
          {allFaves}
        </div>
      )}

}

export default Favorites