import React from 'react';
import './topten.scss';

const Topten = () => {
    return (
        <table className='table flex-column-xy-axis-center'>
        <h1>TOP 10</h1>
            <div className='table-header flex-row-xy-axis-center'>
                <div className='header-pos'>Pos.</div>
                <div className='header-name'>Name</div>
                <div className='header-username'>Username</div>
                <div className='header-score'>Score</div>
            </div>
            <div className='table-body flex-column-xy-axis-center'>
                <div className='body-user flex-row-xy-axis-center'>
                    <div className='data-pos'>1</div>
                    <div className='data-name'>Mateusz</div>
                    <div className='data-username'>Gennaro1665</div>
                    <div className='data-score'>25</div>
                </div>
                <div className='body-user flex-row-xy-axis-center'>
                    <div className='data-pos'>2</div>
                    <div className='data-name'>Kasia</div>
                    <div className='data-username'>Kasiek</div>
                    <div className='data-score'>85</div>
                </div>
            </div>
        </table>

    )
}

export default Topten;