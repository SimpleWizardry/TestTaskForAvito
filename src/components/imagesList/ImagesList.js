import React from 'react';

const ImagesList = ({images,clickHandler}) =>  {

    return images.map((image) =>
        <img
            src={image.url}
            id={image.id}
            key={image.id}
            className='test-img'
            alt=''
            onClick = {clickHandler}
        />
    )
}

export default ImagesList;
