import './ArtCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import PropTypes from "prop-types"

function ArtCard({ image, title, id }) {
  const favoriteCards = useSelector((state) => state.favoriteCards);

  const dispatch = useDispatch();
  const isFavorite = favoriteCards.includes(id);

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
          <img alt={`${title} art piece`} src={image} className='art-card-img' id={id}/>
        </Link>
        <div className='favorite-btn' id="heart" onClick={() => toggleFavorite()}>
          {isFavorite ? (
            <FaHeart className="red-heart" style={{color: 'red', cursor: 'pointer', fontSize: '1.5em'}} />) : 
            (
            <FaRegHeart className="hollow-heart" style={{color: "#FFFFFF", fontSize: '1.5em', filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 1))'}} />
          )}
        </div>
      </div>
    </div>
  );
}

ArtCard.propTypes = { 
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default ArtCard;
