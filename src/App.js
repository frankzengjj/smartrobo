import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import 'tachyons'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import ModerationRecognition from './components/ModerationRecognition/ModerationRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'

const app = new Clarifai.App({
  apiKey: '1fadc6751db54c1c834fc1a99f03f7f3'
 });


const particlesParams = {
  "particles": {
      "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedin: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedin: false})
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.MODERATION_MODEL,
      this.state.input)
    .then(
    function(response) {
      console.log(response.outputs[0].data.concepts[0].name)
      console.log(response.outputs[0].data.concepts[0])
    },
    function(err) {
      alert("There are some problems with your URL. Please check it again")
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles
          className="particles"
          params={particlesParams} 
        />
        <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' 
        ? <div>
          <Logo/>
          <Rank/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <ModerationRecognition imageUrl={this.state.imageUrl}/>
        </div>
        : (
            this.state.route === 'signin'
            ? <Signin onRouteChange = {this.onRouteChange}/>
            : <Register onRouteChange = {this.onRouteChange}/>
          )
        }
      </div>
      
    );
  }
}

export default App;
