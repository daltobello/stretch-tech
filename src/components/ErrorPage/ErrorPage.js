import './ErrorPage.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function ErrorPage({ serverError, resetError }) {

    const errorMessage = serverError && serverError.message ? serverError.message : 'Unknown error occurred.'

    return (
        <div className="serverError">
            <img className='error-image' alt='Mr.Potato Head from the movie Toy Story with his body parts in the wrong places' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cb3371db-5382-4eb9-a3bc-df320d5d1f37/dc8avx8-449548a5-dc42-4a45-88d8-cf8a9149b8ba.png/v1/fill/w_492,h_413/picasso_potato_head_by_zacktv321_dc8avx8-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDEzIiwicGF0aCI6IlwvZlwvY2IzMzcxZGItNTM4Mi00ZWI5LWEzYmMtZGYzMjBkNWQxZjM3XC9kYzhhdng4LTQ0OTU0OGE1LWRjNDItNGE0NS04OGQ4LWNmOGE5MTQ5YjhiYS5wbmciLCJ3aWR0aCI6Ijw9NDkyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.4fKb9_h1ur72XKP_jd1gdnXu4iXrgtH7Vm4HSY24v1M' /> 
            <p>Oh no! {errorMessage}</p> 
            <Link to={'/'} onClick={() => {resetError()}} className='home-link'>
                <button className='return-button'>Return Home</button>
            </Link>
        </div>
    )
}

export default ErrorPage;

ErrorPage.propTypes = {
    serverError: PropTypes.shape({
        hasError: PropTypes.bool.isRequired,
        message:  PropTypes.string.isRequired,
    }),
    resetError: PropTypes.func.isRequired,
  };