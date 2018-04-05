import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../../styles/css/Splash.css";
import Login from '../../assets/images/login.png';


class Splash extends Component{
  render(){
    return( 
    <div className="splash-body">
      <div className="button-container">
        <a href={process.env.REACT_APP_LOGIN}><img src={Login} /></a>
      </div>
    </div>
    )
  }
}

export default Splash;
