import {Component, Fragment} from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import './App.scss';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';


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

const app = new Clarifai.App({ // klucz do api pozwalający dostawcy na identyfikację użytkownika korzystającego z api co pozwala na kontrolę ilości wykorzystywanych zasobów API. Praktycznie każde api korzysta z API key do tego celu. App jest zdefiniowane po to aby potem można bylo z niego korzystąć dalej w kodzie.
  apiKey: 'f8a1d29279af4530bda0c69f0c9de3bb'
 });


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin', //route state jest to stan, który ma za zadanie śledzić w jakim miejscu na stronie się znajdujemy
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)  // w nawiasie model, i po przecinku preóbka czyli jakieś zdjęcie. Modele możnazobaczyć w dokumentacji w odnośniku do githuba clarifai w pliku index
    .then(
      response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err))
  }

  onRouteChange = (direction) => {
    if(direction === 'signin') {
      this.setState({isSignedIn: false})
    } else if(direction === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: direction})
  }

  render() {
    const {box, imageURL, route, isSignedIn} = this.state;
    return(
      <div className='App'>
          <Particles className='particles' 
              params={particlesOptions}
          />
        <Navigation className='zind' onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' ? 
            <Fragment>
              <Logo className='zind'/>;
              <Rank className='zind'/>
              <ImageLinkForm className='zind' onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box}imageURL={imageURL}/>
            </Fragment>
          : (
            route === 'signin' ?
            <SignIn onRouteChange={this.onRouteChange}/>
            :
            <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    )
  }
}

export default App;
