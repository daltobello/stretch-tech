import './ArtCard.css'

function ArtCard({ image, title }) {
  return (
    <div className='art-card'>
      <img src={image}className='art-card-img'/>
      <p>{title}</p>
    </div>
  )
}

export default ArtCard