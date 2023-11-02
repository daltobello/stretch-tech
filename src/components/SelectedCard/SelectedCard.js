import './SelectedCard.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleArtDetails } from '../../apiCalls'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../Redux/favoriteCardsSlice'
import { FaRegHeart, FaLeftLong, FaHeart } from 'react-icons/fa6';

function SelectedCard() {
    const [selectedArt, setSelectedArt] = useState(false)
    const { id } = useParams();
    const favoriteCards = useSelector((state) => state.favoriteCards);
    const idNum = parseInt(id)
    const dispatch = useDispatch();
    const isFavorite = favoriteCards.includes(idNum);
    console.log(idNum)

    const toggleFavorite = () => {
        if (isFavorite) {
          dispatch(removeFavorite(idNum))
      } else {
          dispatch(addFavorite(idNum));
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
                <button className='back-btn' onClick={() => window.history.back()}>
                    <FaLeftLong style={{color: "#000000", fontSize: '1.3em'}}/>
                </button>
                <div className='selected-favorite-btn' id="heart" onClick={() => toggleFavorite()}>
                {isFavorite ? (
                    <FaHeart style={{color: 'red', cursor: 'pointer', fontSize: '1.3em'}} />) : 
                    (
                    <FaRegHeart style={{color: "#000000", fontSize: '1.3em'}} />
                    )}
                </div>
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