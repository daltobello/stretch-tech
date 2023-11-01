import './SelectedCard.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleArtDetails } from '../../apiCalls'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowLeft  } from '@fortawesome/free-solid-svg-icons';

function SelectedCard() {
    const [selectedArt, setSelectedArt] = useState(false)
    const { id } = useParams()
    const favoriteCards = useSelector((state) => state.favoriteCards);

    const dispatch = useDispatch();
    const isFavorite = favoriteCards.includes(id);

    const toggleFavorite = () => {
        if (isFavorite) {
          dispatch(removeFavorite(id))
      } else {
          dispatch(addFavorite(id));
        }
      }
      
    useEffect(() => {
        console.log('useEffectID', id)
        getSingleArtDetails(id)
            .then(data => {
                setSelectedArt(data)
            })
    }, [id])

    return (
        <div className='selected-art-container'>
            <div className='selected-art-image-wrapper'>
                <div className='frame'>
                <img alt={`photo for ${selectedArt.title} art piece`} src={selectedArt.primaryImage} className='selected-art-card-img'/>
                </div>
            </div>
            <div className='buttons-wrapper'>
                <div className='selected-favorite-btn' id="heart" onClick={() => toggleFavorite()}>
                {isFavorite ? (
                    <FontAwesomeIcon icon={faHeart} style={{ color: 'red', cursor: 'pointer', fontSize: '1.3em'}} />) : 
                    (
                    <FontAwesomeIcon icon={faHeart} style={{color: "#FFFFFF", fontSize: '1.3em'}} />
                    )}
                </div>
                <Link to='/'>
                    <FontAwesomeIcon icon={faArrowLeft} style={{color: "#000000", fontSize: '1.3em'}}/>
                </Link>
            </div>
            <div className='selected-art-info'>
                <h2 className='art-title'>{selectedArt.title}</h2>
                <div className='overview'>
                    <b>Artist:</b> {selectedArt.artistDisplayName}, {selectedArt.artistDisplayBio}
                    <b>Medium:</b> {selectedArt.medium}
                    <b>Dimensions:</b> {selectedArt.dimensions}
                    <b>Credit Line:</b> {selectedArt.creditLine}
                    <b>Accession Number:</b> {selectedArt.accessionNumber}
                </div>
            </div>
        </div>
    )
}

export default SelectedCard