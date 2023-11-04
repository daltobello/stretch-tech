import './Header.css'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import logo from '../../images/logo.png';

function Header({ resetError }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='header'>
      <Link to='/' className='home-link' onClick={() => {resetError()}}>
        <h1><img src={logo} className='logo'/>THE MET</h1>
      </Link>
      <Link to='/favorites' className='favorites-link'>
          <button 
          className='fav-button'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
          {isHovered ? (
            <span className="long-text">FAVORITES</span>
            ) : (  
              <span className="short-text"><FaRegHeart/></span>
            )}
          </button>
      </Link>  
    </div>
  )
}

Header.propTypes = {
  resetError: PropTypes.func.isRequired,
};

export default Header