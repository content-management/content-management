import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import '../../styles/css/Header.css';



class Header extends Component {
    render(){
        return(
            <div>
                <div className="header">
                <div><img src={Logo} className='logo'alt="Logo"/></div>
                <div className="nav">
                <Link to={`/Home/:id`}> <div className='links'>Home</div></Link>
                <div className='dropdown'>Switch Sites
                <div className='dropdown-content'>
                <a href ="#">Blog 1</a>
                </div>
                </div>
                <Link to={`/Posts/:id`}><div className='links'>Posts</div></Link>
                </div>
                </div>
            </div>
        )
    }
}

export default Header;