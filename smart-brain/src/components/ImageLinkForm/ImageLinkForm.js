import React from 'react';
import './imageLinkForm.scss'

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3 tc'>
                This Magic Brain Will detect faces in your pictures. Git it a try
            </p>
            <div className='flex justify-center'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text'/>
                    <button className=' w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>  
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;