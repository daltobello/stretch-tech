import './Loader.css';
import { Bars } from 'react-loading-icons'

function Loader() {

    return (
        <div className='loading-container'>
            <Bars className='load-bars' />
            <h2>LOADING....</h2>
        </div>
    )
}

export default Loader