import { getSingleArtDetails } from '../../apiCalls';
import './Favorites.css'
import { useSelector } from 'react-redux';
import ArtCard from '../ArtCard/ArtCard';
import { useEffect, useState } from 'react';

function Favorites() {
  const favoriteCards = useSelector((state) => state.favoriteCards);
  console.log(favoriteCards)
  const [allFaves, setAllFaves] = useState([]);

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
    }
    fetchFaves()
  }, [favoriteCards])

  return (
    <div className='favorites-container'>
      {allFaves}
    </div>
  )
}

export default Favorites