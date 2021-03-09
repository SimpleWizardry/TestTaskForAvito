import React from 'react';
import spinner from './spinner.png'

const LoadingSpinner = () =>  {
    return (
        <div className='spinner-screen'>
            <img src={spinner} alt='spinner' />
        </div>
    )
}

export default LoadingSpinner;