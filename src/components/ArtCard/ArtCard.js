import './ArtCard.css'
import { Link } from 'react-router-dom'

function ArtCard({ image, title, id }) {
  return (
    
    <div className='art-card'>
      <Link to={`/art/${id}`} className='selected-art-link'>
        <img alt={`photo for ${title} art piece`} src={image}className='art-card-img'/>
        <p>{title}</p>
      </Link>
    </div>

  )
}

export default ArtCard