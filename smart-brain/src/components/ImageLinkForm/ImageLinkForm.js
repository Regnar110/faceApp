import React from 'react';
import './imageLinkForm.scss'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='f3 tc'>
                This Magic Brain Will detect faces in your pictures. Git it a try
            </p>
            <div className='flex justify-center'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>  
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;