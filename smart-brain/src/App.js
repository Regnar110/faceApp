import {Component} from 'react';
import Particles from 'react-particles-js'
import './App.scss';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'

const particlesOptions = {
    particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        }
    }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      none: true
    }
  }

  render() {

    return(
      <div className='App'>
          <Particles className='particles' 
              params={particlesOptions}
          />
        <Navigation className='zind'/>
        <Logo className='zind'/>
        <Rank className='zind'/>
        <ImageLinkForm className='zind'/>
        {/* <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
