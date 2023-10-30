import './ArtCard.css';
import { Link } from 'react-router-dom';

function ArtCard({ image, title, id, setFavoriteCards, favoriteCards }) {
  const isFavorite = favoriteCards.includes(id);
  console.log(favoriteCards)
  const toggleFavorite = (event) => {
    event.preventDefault();
    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards))
    if (isFavorite) {
      // If it's already a favorite, remove it from the favorites
      const updatedFavorites = favoriteCards.filter((favoriteId) => favoriteId !== id);
      setFavoriteCards(updatedFavorites);
    } else {
      // If it's not a favorite, add it to the favorites
      setFavoriteCards([...favoriteCards, id]);
    }
    localStorage.setItem("favoriteCards", JSON.stringify(favoriteCards))
    console.log(favoriteCards)
  };

  return (
    <div className='art-card'>
      <div className='image-container'>
        <Link to={`/art/${id}`} className='selected-art-link'>
          <img alt={`photo for ${title} art piece`} src={image} className='art-card-img' />
          <button onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <p className="art-title">{title}</p>
        </Link>
      </div>
    </div>
  );
}

export default ArtCard;
