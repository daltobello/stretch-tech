import './ArtCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ArtCard({ image, title, id }) {
  const favoriteCards = useSelector((state) => state.favoriteCards);

  const dispatch = useDispatch();
  const isFavorite = favoriteCards.includes(id);
  console.log(favoriteCards)

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
  } else {
      dispatch(addFavorite(id));
    }
  }

  return (
    <div className='art-card'>
      <div className='image-container'>
        <Link to={`/art/${id}`} className='selected-art-link'>
          <img alt={`photo for ${title} art piece`} src={image} className='art-card-img' />
          <p className="art-title"></p>
        </Link>
        <div className='favorite-btn' id="heart" onClick={() => toggleFavorite()}>
          {isFavorite ? (
            <FontAwesomeIcon icon={faHeart} style={{color: 'red', cursor: 'pointer', fontSize: '1.5em'}} />) : 
            (
            <FontAwesomeIcon icon={faHeart} style={{color: "#FFFFFF", fontSize: '1.5em'}} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtCard;
