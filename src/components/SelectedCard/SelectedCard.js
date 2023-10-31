import './SelectedCard.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleArtDetails } from '../../apiCalls'
import { Link } from 'react-router-dom'

function SelectedCard() {
    const [selectedArt, setSelectedArt] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        console.log('useEffectID', id)
        getSingleArtDetails(id)
            .then(data => {
                setSelectedArt(data)
            })
    }, [id])

    return (
        <div className='selected-art-container'>
            <div className='selected-art-image'>
                <img alt={`photo for ${selectedArt.title} art piece`} src={selectedArt.primaryImage}className='art-card-img'/>
            </div>
            <div className='selected-art-info'>
                <h2 className='art-title'>{selectedArt.title}</h2>
            
                <div className='overview'>
                    Artist: {selectedArt.artistDisplayName}, {selectedArt.artistDisplayBio} <br />
                    Medium: {selectedArt.medium} <br />
                    Dimensions: {selectedArt.dimensions} <br />
                    Classification: {selectedArt.miniatures} <br />
                    Credit Line: {selectedArt.creditLine} <br />
                    Accession Number: {selectedArt.accessionNumber}
                </div>
            </div>
            <Link to='/'>
                <button>back</button>
            </Link>
        </div>
    )
}

export default SelectedCard