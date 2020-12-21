import {Component, Fragment} from 'react';
import Particles from 'react-particles-js'
import './App.scss';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
import Topten from './components/topTen/Topten'


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

 const initialState = { 
  input: '',
  imageURL: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    username: ''
  }
 }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin', 
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        username: ''
      }
    }
  }

  loadUser = (data) => {
    const {id, name, email, entries, joined, username} = data;
    this.setState({user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
        username: username
      }
    })
  }

  calculateFaceLocation = (data) => {
    const regionsArr = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);

    const boundingBoxArray = regionsArr.map(element => {
      let box = element.region_info.bounding_box;
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    })
    return boundingBoxArray;
  }

  displayFaceBox = box => {
      this.setState({box: box})}

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('https://hidden-mesa-50173.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://hidden-mesa-50173.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count})) 
        })
        .catch(err => console.log('unable to change count'))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
  }


  onRouteChange = (direction) => {
    if(direction === 'signin') {
      this.setState(initialState)
    } else if(direction === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: direction})
  }

  render() {
    const {name, entries} = this.state.user;
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
              <Rank className='zind' name={name} entries={entries}/>
              <ImageLinkForm className='zind' onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={box}imageURL={imageURL}/>
            </Fragment>
          : (
            route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :
              (
                route === 'register' ?
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                :
                (
                  route === 'topten' ?
                  <Topten />
                  :
                  null
                )
              )
            )
        }
      </div>
    )
  }
}

export default App;
