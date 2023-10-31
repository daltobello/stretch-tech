import './Gallery.css'
import ArtCard from '../ArtCard/ArtCard'

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

export default Gallery