import './ArtCard.css'
import { Link } from 'react-router-dom'

function ArtCard({ image, title, id, makeFavorite}) {
  return (
    <div className='art-card'>
      <div className='image-container'>        
        <Link to={`/art/${id}`} className='selected-art-link'>
          <img alt={`photo for ${title} art piece`} src={image}className='art-card-img'/>
          <button onClick={null}>Button</button>
         <p>{title}</p>
        </Link>
      </div>
    </div>
  )
}

export default ArtCard