import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
      <Link to='/' className='home-link'>
        <h1>THE MET</h1>
      </Link>
    </div>
  )
}

export default Header