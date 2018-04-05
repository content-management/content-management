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
                <Link to={`/pickblog/:id`}><div className='links'>Switch Sites</div></Link>
                <Link to={`/Posts/:id`}><div className='links'>Posts</div></Link>
                </div>
                </div>
            </div>
        )
    }
}

export default Header;