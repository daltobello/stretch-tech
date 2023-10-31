import './ArtCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'

function ArtCard({ image, title, id }) {
  const favoriteCards = useSelector((state) => state.favoriteCards);

  const dispatch = useDispatch();
  const isFavorite = favoriteCards.includes(id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id))
  } else {
      dispatch(addFavorite(id));
    }
  }

  return (
    <div className='art-card'>
      <div className='image-container'>
        <Link to={`/art/${id}`} className='selected-art-link'>
          <img alt={`photo for ${title} art piece`} src={image} className='art-card-img' />
          <p className="art-title">{title}</p>
        </Link>
          <button onClick={() => toggleFavorite()}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
      </div>
    </div>
  );
}

export default ArtCard;
