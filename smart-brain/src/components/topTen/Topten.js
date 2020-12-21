import React, { Component } from 'react';
import './topten.scss';

class Topten extends Component {
    constructor() {
        super();
        this.state = {
            topUsers: []
        }
    }

    componentDidMount() {
        fetch("https://hidden-mesa-50173.herokuapp.com//top", { 
            method: 'GET' // definiujemy jakiej metody użyjemy. Po stronie serwera też jest app.get więc tutaj musi być to samo.
        })
        .then(response => response.json())
        .then(data => {
            this.setState({topUsers: data})
        })
        .catch(error => console.log('cannot get top users'));
    }

    render() {
        return (
            <div className='table flex-column-xy-axis-center'>
            <h1>TOP 10</h1>
                <div className='table-header flex-row-xy-axis-center'>
                    <div className='header-pos'>Pos.</div>
                    <div className='header-name'>Name</div>
                    <div className='header-username'>Username</div>
                    <div className='header-score'>Score</div>
                </div>
                <div className='table-body flex-column-xy-axis-center'>
                    {
                        this.state.topUsers.map((element, i) => {
                            return(
                                <div className='body-user flex-row-xy-axis-center' key={i}>
                                    <div className='data-pos data-bottom-border mt3'>{`#${i+1}`}</div>
                                    <div className='data-name data-bottom-border mt3'>{element.name}</div>
                                    <div className='data-username data-bottom-border mt3'>{element.username}</div>
                                    <div className='data-score data-bottom-border mt3'>{element.entries}</div>
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        )
    }
}


export default Topten;