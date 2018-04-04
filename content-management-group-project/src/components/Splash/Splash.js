import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../../styles/css/Splash.css";
// import Background from './backgroudphoto.jpg';

class Splash extends Component{
  render(){
    return( 
    <div className="splash-body">
      <div className="button-container">
        <button className='loginButton'><a href={process.env.REACT_APP_LOGIN}>Login/Sign Up</a></button>
      </div>
    </div>
    )
  }
}

export default Splash;
