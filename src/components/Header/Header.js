import './Header.css'
import { Link } from 'react-router-dom'

function Header({ resetError }) {
  return (
    <div className='header'>
      <Link to='/' className='home-link' onClick={() => {resetError()}}>
        <h1>THE MET</h1>
      </Link>
      <Link to='/favorites' className='favorites-link'>
        <button className='fav-button'>Favorites</button>
      </Link>  
    </div>
  )
}

export default Header