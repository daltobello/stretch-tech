import './Gallery.css'
import ArtCard from '../ArtCard/ArtCard'
import PropTypes from 'prop-types'

function Gallery({ departmentObj }) {
  const allArtCards = departmentObj.map((obj => {
    return (
      <ArtCard
      id={obj.objectID}
      key={obj.objectID}
      date={obj.objectDate}
      image={obj.primaryImage}
      title={obj.title}
      artist={obj.artistAlphaSort}
      />)
  }))
  
  return (
    <div className='gallery'>{allArtCards}</div>
  )
}

Gallery.propTypes = { 
  departmentObj: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      artist: PropTypes.string
    })
  )
}


export default Gallery