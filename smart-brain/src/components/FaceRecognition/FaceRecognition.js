import React from 'react';
import './faceRecognition.scss'

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center ma'>
            <div className='mt2 relative'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}/>
            </div>
        </div>
    )
}

export default FaceRecognition;