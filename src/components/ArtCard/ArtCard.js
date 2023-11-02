import './ArtCard.css';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import { FaRegHeart, FaHeart } from "react-icons/fa6";

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
          <img alt={`${title} art piece`} src={image} className='art-card-img' id={id}/>
        </Link>
        <div className='favorite-btn' id="heart" onClick={() => toggleFavorite()}>
          {isFavorite ? (
            <FaHeart style={{color: 'red', cursor: 'pointer', fontSize: '1.5em'}} />) : 
            (
            <FaRegHeart style={{color: "#FFFFFF", fontSize: '1.5em', filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 1))'}} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtCard;
