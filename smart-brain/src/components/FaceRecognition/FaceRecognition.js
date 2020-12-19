import React from 'react';
import './faceRecognition.scss'

const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className='center ma'>
            <div className='mt2 relative'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto'/>
                {
                    box.map((element, i) => {
                        return (
                            <div className='bounding-box' key={i} style={{top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol}}/>
                        ) 
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;